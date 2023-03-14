import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check } from 'prettier';
import { Customer } from 'src/customer/model/customer.entity';
import { Like, Repository } from 'typeorm';
import { CheckIn } from '../model/checkin.entity';

@Controller('check-in')
export class CheckInController {
  private logger: Logger;
  constructor(
    @InjectRepository(CheckIn)
    private readonly repository: Repository<CheckIn>,
    @InjectRepository(Customer)
    private readonly repositoryCustomer: Repository<Customer>
    ) {
      this.logger = new Logger('CheckInControllerRepository');
    }

  @Post()
  async create(@Body() checkIn: CheckIn): Promise<CheckIn> {
    try {
      return this.repository.save(checkIn);
    } catch (error) {
      this.logger.error(`Não foi possivel realizar um check-in. ${error}`);
      throw new Error('Erro ao realizar um check-in');
    }
   
  }
  
  @Get()
  async findAll(): Promise<CheckIn[]> {
    return this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CheckIn> {
    const checkIn = await this.repository.findOne({where:{ id }});
    if(!checkIn){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    return checkIn;
  }

  @Get('/rfid/:rfid_query')
  async findOneByRfif(@Param('rfid_query') rfid_query: string): Promise<CheckIn> {
   
    let checkIn = await this.repository.findOneBy({rfid:rfid_query})
    
    if(!checkIn){
      throw new NotFoundException('CheckIn não encontrado! Tente novamente!')
    }
    let id = Number(checkIn.customer_id)
    checkIn.customer = await this.repositoryCustomer.findOne({where:{ id }})
    return checkIn;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() checkIn: CheckIn): Promise<CheckIn> {
    const checkInFound = await this.repository.findOne({where:{ id }});
    if(!checkInFound){
      throw new NotFoundException('Check-in não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, checkIn)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const checkInFound = await this.repository.findOne({where:{ id }});
    if(!checkInFound){
      throw new NotFoundException('Check-in não encontrado! Tente novamente!')
    }
    const checkInDeleted = await this.repository.delete({id})

    if(checkInDeleted.affected > 0){
      return `Check-in ${id} deletado com sucesso!`;
    }
  }
}
