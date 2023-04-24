import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { Repository } from 'typeorm';
import { ChoppStock } from '../model/choppStock.entity';

@Controller('ChoppStock')
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
    try {
      return this.repository.save(chopp);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar o estoque do chopp. ${error}`);
      throw new Error('Erro ao cadastrar o estoque do chopp');
    }
  }

  @Get('/frid')
  async findOne(@Param('frid') rfid: string): Promise<ChoppStock> {
    return this.repository.findOne({where: {rfid: rfid}});
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

}
