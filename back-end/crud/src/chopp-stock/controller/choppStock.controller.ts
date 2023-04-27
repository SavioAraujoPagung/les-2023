import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChoppStock } from '../model/choppStock.entity';

@Controller('choop')
export class ChoppStockController {
  private logger: Logger;
  constructor(
    @InjectRepository(ChoppStock)
    private readonly repository: Repository<ChoppStock>,
    
    ) {
      this.logger = new Logger('ChoppControllerRepository');
    }

  @Post()
  async create(@Body() chopp: ChoppStock): Promise<ChoppStock> {
    const choppFound = await this.repository.findOne({where: {rfid: chopp.rfid}});
      if(choppFound) {
        throw new Error('Chopp já cadastrado com esse RFID');
      }
    try { 
      return this.repository.save(chopp);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar o estoque do chopp. ${error}`);
      throw new Error('Erro ao cadastrar o estoque do chopp');
    }
  }
  
  @Post("stock")
  async createAll(@Body() chopps: ChoppStock[]): Promise<ChoppStock[]> {
    try {
      let qtd = chopps.length
      for(let i = 0; i < qtd; i++) {
        let chopp = await this.repository.findOne({where: {id: chopps[i].id}})
        chopp.qtd += chopps[i].qtd
        if(chopp.qtd < 0) chopp.qtd = 0
        await this.repository.save(chopp)
      }

      return chopps
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar os chopps. ${error}`);
      throw new Error('Erro ao cadastrar os chopps');
    }
  }

  @Get('/rfid/:rfid')
  async findOneByRFID(@Param('rfid') rfid: string): Promise<ChoppStock> {
    const chopp = await this.repository.findOne({where: {rfid: rfid}});
    if(!chopp) throw new NotFoundException('Chopp não encontrado! Tente novamente!');
    return chopp;
  }
  
  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ChoppStock> {
    const chopp = await this.repository.findOne({where: {id}});
    if(!chopp) throw new NotFoundException('Chopp não encontrado! Tente novamente!');
    return chopp;
  }
  
  @Get()
  async findAll(): Promise<ChoppStock[]> {
    return this.repository.find();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const choppStock = await this.repository.findOne({where:{ id }});
    if(!choppStock){
      throw new NotFoundException('Estoque de chopp não encontrado! Tente novamente!')
    }
    const choppStockDeleted = await this.repository.delete({id})

    if(choppStockDeleted.affected > 0){
      return `Estoque de chopp ${id} deletado com sucesso!`;
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() chopp: ChoppStock): Promise<ChoppStock> {
    const choppFound = await this.repository.findOne({where:{ id }});
    if(!choppFound){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, chopp)
    return this.repository.findOne({where:{ id }})
  }

}
