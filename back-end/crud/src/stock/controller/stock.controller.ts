import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { In, Repository } from 'typeorm';
import { Stock } from '../model/stock.entity';

@Controller('stock')
export class StockController {
  private logger: Logger;
  constructor(
    @InjectRepository(Stock)
    private readonly repository: Repository<Stock>,
    ) {
      this.logger = new Logger('StockControllerRepository');
    }

  @Post()
  async create(@Body() stock: Stock[]): Promise<boolean> {
    try {
      stock.forEach(async (stockProduct) => {
        const stockProductFound = await this.repository.findOneBy({barcode: stockProduct.barcode})
        if(stockProductFound){
          stockProductFound.qtd += stockProduct.qtd
          await this.repository.save(stockProductFound)
        }else{
          await this.repository.save(stockProduct)
        }
      })
      return true
    } catch (error) {
      this.logger.error(`Não foi possivel salvar o produto no estoque. ${error}`);
      throw new Error('Erro ao realizar o salvamento do produto no estoque');
    }
  }

  @Get()
  async findAll(): Promise<Stock[]> {
    return await this.repository.find();
  }

  @Get(':barcode')
  async findOne(@Param('barcode') barcode: string): Promise<Stock> {
    const stockProduct = await this.repository.findOneBy({barcode: barcode});
    if(!stockProduct){
      throw new NotFoundException('Produto não encontrado no estoque! Tente novamente!')
    }
    return stockProduct;
  }

  @Put(':barcode')
  async update(@Param('barcode') barcode: string, @Body() stockProduct: Stock): Promise<Stock> {
    const stockProductFound = await this.repository.findOne({where:{ barcode }});
    if(!stockProductFound){
      throw new NotFoundException('Produto não encontrado no estoque! Tente novamente!')
    }
    await this.repository.update({barcode}, stockProduct)
    return this.repository.findOne({where:{ barcode }})
  }

  @Delete(':barcode')
  async delete(@Param('barcode') barcode: string): Promise<string> {
    const productStockFound = await this.repository.findOne({where:{ barcode }});
    if(!productStockFound){
      throw new NotFoundException('Produto não encontrado no estoque! Tente novamente!')
    }
    const productStockDeleted = await this.repository.delete({barcode})

    if(productStockDeleted.affected > 0){
      return `Produto ${barcode} deletado com sucesso!`;
    }
  }
}
