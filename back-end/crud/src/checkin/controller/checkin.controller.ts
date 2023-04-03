import { Controller, Get, Post, Body, Param, ParseIntPipe, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { Repository } from 'typeorm';
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

  @Post('/:rfid')
  async create(@Param('rfid', ParseIntPipe) rfid: string): Promise<CheckIn> {
    const checkIn = new CheckIn()
    const now = new Date();
    const customer = await this.findCustomer(rfid) //new Customer()
    
    checkIn.time = now.toUTCString();
    checkIn.customer = customer

    if (await this.isOnline(rfid)) {
      throw new BadRequestException("Cliente já esta online") ;
    }

    try {
      const c = this.repository.save(checkIn);
      return c;
    } catch (error) {
      throw new BadRequestException("Verifique se seu cartao é válido!");
    }
   
  }

  @Get('/:rfid')
  async find(@Param('rfid', ParseIntPipe) rfid: string): Promise<CheckIn> {
    return await this.getRridOnline(rfid)
  }

  @Post('/pagar/:rfid')
  async paymentCheckin(@Body() payment: CheckIn[]): Promise<CheckIn[]> {
    var checkins: CheckIn[]

    //fazendo aqui 
    for (let i = 0; i < payment.length; i++) {
      checkins.push(await this.getRridOnline(payment[i].customer.rfid))
    };


    //TODO fazer isso aqui de pagar
    return null
  }

  async isOnline(filter: string): Promise<boolean> {
    const checkIn = await this.repository.find({
      relations: ['customer'],
      where: [
        { customer: { rfid: filter } }, 
      ],
    });
    
    for (let i = 0; i < checkIn.length; i++) {
      if (!checkIn[i].pago) {
        return true;
      }
    };

    return false;
  }

  async getRridOnline(filter: string): Promise<CheckIn> {
    const checkIn = await this.repository.find({
      relations: ['customer'],
      where: [
        { customer: { rfid: filter } }, 
      ],
    });
    
    for (let i = 0; i < checkIn.length; i++) {
      if (!checkIn[i].pago) {
        return checkIn[i];
      }
    };

    throw new NotFoundException("Não há checkin para este RFID!");
  }

  async findCustomer(filter: string): Promise<Customer> {
    const customer =  await this.repositoryCustomer.findOne({
      where: [
        { rfid: filter }, 
      ],
    });

    if (customer == null) {
      throw new BadRequestException("Cliente não encontrado");
    }

    return customer;
  }

}
