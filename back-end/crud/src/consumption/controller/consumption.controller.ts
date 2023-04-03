import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumption } from '../model/Consumption.entity';

@Controller('consumption')
export class ConsumptionController {
  private logger: Logger;
  constructor(
    @InjectRepository(Consumption)
    private readonly repository: Repository<Consumption>
    ) {
      this.logger = new Logger('CustomerControllerRepository');
    }

  @Post()
  async create(@Body() consumption: Consumption): Promise<Consumption> {
    try {
      return this.repository.save(consumption);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new Error('Erro ao cadastrar um cliente');
    }
   
  } 
  
  @Get()
  async findAll(): Promise<Consumption[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Consumption> {
    const user = await this.repository.findOne({where:{ id }});
    if(!user){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    return user;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() consumption: Consumption): Promise<Consumption> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, consumption)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    const userDeleted = await this.repository.delete({id})

    if(userDeleted.affected > 0){
      return `Cliente ${id} deletado com sucesso!`;
    }
  }
}
