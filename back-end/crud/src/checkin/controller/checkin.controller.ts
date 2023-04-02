import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
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
  
  @Post('/pago/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CheckIn> {
    const checkIn = await this.repository.findOne({where:{ id }});
    if(!checkIn){
      throw new NotFoundException('Produto não encontrado! Tente novamente!')
    }
    return checkIn;
  }
}
