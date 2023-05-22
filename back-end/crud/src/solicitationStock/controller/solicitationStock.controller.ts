import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { Repository } from 'typeorm';
import { SolicitationStock, SolicitationDTO } from '../model/solicitationStock.entity';

@Controller('solicitationStock')
export class solicitationStockController {
  private logger: Logger;
  constructor(
    @InjectRepository(SolicitationStock)
    private readonly repository: Repository<SolicitationStock>,
    @InjectRepository(Product)
    private readonly prodRepo: Repository<Product>
    ) {
      this.logger = new Logger('SolicitationControllerRepository');
    }

  @Post()
  async create(@Body() user: SolicitationStock[]): Promise<SolicitationStock[]> {
    try {
      return this.repository.save(user);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar a Solicitação de comida. ${error}`);
      throw new Error('Erro ao cadastrar a Solicitação de comida');
    }
  }

  @Post('/many')
  async createMany(@Body() s: SolicitationDTO[]): Promise<SolicitationStock[]> {
    try {
      var solicitations :SolicitationDTO[]
      solicitations = []
      var barcode :string
      barcode = ""

      for (let i = 0; i < s.length; i++) {
        let product = await this.findOneByID(s[i].barcode)
        solicitations.push(new SolicitationStock(s[i].barcode, s[i].qtd, product.name))
      }

      return this.repository.save(solicitations);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar a Solicitação de comida. ${error}`);
      throw error;
    }
  }

  async findOneByID(id: string): Promise<Product> {
    let product = await this.prodRepo.findOneBy({id})
    if(!product){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }

    return product;
  }

  @Get('/status')
  async findAllWithStatusTrue(): Promise<SolicitationStock[]> {
    return this.repository.find({where:{status:true}});
  }
  
  @Get()
  async findAll(): Promise<SolicitationStock[]> {
    return this.repository.find();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number): Promise<SolicitationStock[]> {
    const solicitationFound = await this.repository.findOne({where:{ id, status:true}});

    if(!solicitationFound){
      throw new NotFoundException('Solicitação não encontrada! Tente novamente!')
    }

    await this.repository.update({id},{status:false})
    return this.findAllWithStatusTrue();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const solicitationFound = await this.repository.findOne({where:{ id }});
    if(!solicitationFound){
      throw new NotFoundException('Solicitação não encontrado! Tente novamente!')
    }
    const solicitationDeleted = await this.repository.delete({id})

    if(solicitationDeleted.affected > 0){
      return `Solicitação ${id} deletado com sucesso!`;
    }
  }

}
