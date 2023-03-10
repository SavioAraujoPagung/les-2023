import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';

@Controller('product')
export class ProductController {
  private logger: Logger;
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
    ) {
      this.logger = new Logger('ProductControllerRepository');
    }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    try {
      return this.repository.save(product);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new Error('Erro ao cadastrar um produto');
    }
   
  }
  
  @Get()
  async findAll(): Promise<Product[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.repository.findOne({where:{ id }});
    if(!product){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    return product;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() product: Product): Promise<Product> {
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
