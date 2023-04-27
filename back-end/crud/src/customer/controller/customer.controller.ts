import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException, Logger, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../model/customer.entity';

@Controller('customer')
export class CustomerController {
  private logger: Logger;
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>
    ) {
      this.logger = new Logger('CustomerControllerRepository');
    }

  @Post()
  async create(@Body() customer: Customer): Promise<Customer> {
    try {
      return this.repository.save(customer);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new Error('Erro ao cadastrar um cliente');
    }
   
  }
  
  @Get()
  async findAll(): Promise<Customer[]> {
    return this.repository.find({where:{ active: true }});
  }

  @Get(':rfid')
  async findOne(@Param('rfid') rfid: string): Promise<Customer> {
    const user = await this.repository.findOne({where:{ rfid }});
    if(!user){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    return user;
  }

  @Put()
  async delete(@Body() update: Customer): Promise<Customer> {
    const customer = await this.repository.findOne({where:{ rfid: update.rfid }});
    if(!customer){
      throw new NotFoundException('Cliente não encontrado!')
    }
    return  await this.repository.save(update)
  }

  @Put(':rfid')
  async desativar(@Param('rfid') rfid: string): Promise<Customer> {
    const customer = await this.repository.findOne({where:{ rfid: rfid }});
    if(!customer){
      throw new NotFoundException('Cliente não encontrado!')
    }

    customer.active = !customer.active
    return  await this.repository.save(customer)
  }
}
