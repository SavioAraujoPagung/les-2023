import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../model/product.entity';

@Controller('products')
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
    if (!product.isChopp) {
      throw new BadRequestException('Somente chopps por favor');
    }
    
    try {
      return this.repository.save(product);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new Error('Erro ao cadastrar um produto');
    }
   
  }

  @Get(':id')
  async findOneByBarcode(@Param('barcode') id: string): Promise<Product> {
    console.log("chopp")
    let product = await this.repository.findOneBy({id})
    
    if(!product){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }

    return product;
  }
  
  @Get('/chopps/all')
  async findAllChopps(): Promise<Product[]> {
    const prods = await this.repository.find({where: { isChopp: true }});
    console.log(prods)
    return prods
  }

  @Get('/self-service/all')
  async findAllSelfService(): Promise<Product> {
    const prods = await this.repository.findOne({where: { isChopp: false }});
    console.log(prods)
    return prods
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    const productFound = await this.repository.findOne({where:{ id }});
    if(!productFound){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, product)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
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
