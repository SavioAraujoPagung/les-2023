import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductConsumption } from '../model/ProductConsumption.entity';

@Controller('product-consumption')
export class ProductConsumptionController {
  private logger: Logger;
  constructor(
    @InjectRepository(ProductConsumption)
    private readonly repository: Repository<ProductConsumption>
    ) {
      this.logger = new Logger('ProductControllerRepository');
    }

  @Post()
  async create(@Body() product: ProductConsumption): Promise<ProductConsumption> {
    try {
      return this.repository.save(product);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new Error('Erro ao cadastrar um produto');
    }
  }
  
  @Get()
  async findAll(): Promise<ProductConsumption[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductConsumption> {
    const product = await this.repository.findOne({where:{ id }});
    if(!product){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    return product;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() product: ProductConsumption
  ): Promise<ProductConsumption> {
    const productFound = await this.repository.findOne({where:{ id }});
    if(!productFound){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, product)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const productFound = await this.repository.findOne({where:{ id }});
    if(!productFound){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    const productDeleted = await this.repository.delete({id})

    if(productDeleted.affected > 0){
      return `Produto ${id} deletado com sucesso!`;
    }
  }
}
