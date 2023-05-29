import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, Logger, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewProduct, Product } from '../model/product.entity';

@Controller('products')
export class ProductController {
  private logger: Logger;
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(NewProduct)
    private readonly repositoryNew: Repository<NewProduct>
    ) {
      this.logger = new Logger('ProductControllerRepository');
    }

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    try {
      return this.repository.save(product);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new BadRequestException('Erro ao cadastrar um produto');
    }
   
  }

  @Post('/stock')
  async stock(@Body() products: Product[]): Promise<Product[]> {
    try {
      const tam = products.length
      var att: Product[]
      att = []

      var solicitations: NewProduct[]
      solicitations = []

      for(let i = 0; i < tam; i++) {
        const prod = await this.repository.findOne({where: {id: products[i].id}})
        prod.qtd += products[i].qtd
        
        if (prod.qtd < 0) {
          prod.qtd = 0
        }

        solicitations.push(new NewProduct(prod,  prod.priceCost))
        att.push(prod)
      }

      await this.repositoryNew.save(solicitations)
      return this.repository.save(att)
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new BadRequestException('Erro ao cadastrar um produto');
    }
  }

  @Get(':id')
  async findOneByID(@Param('id') id: string): Promise<Product> {
    let product = await this.repository.findOneBy({id})
    
    if(!product){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }

    return product;
  }
  
  @Get('/type/:type')
  async findByType(@Param('type', ParseIntPipe) type: number): Promise<Product[]> {
    return this.repository.find({where: { type }});
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    const productFound = await this.repository.findOne({where:{ id }});
    if(!productFound){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }

    product.qtd = productFound.qtd

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
