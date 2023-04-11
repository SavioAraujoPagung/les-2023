import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { Repository } from 'typeorm';
import { CheckOut } from '../model/checkout.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';

@Controller('check-out')
export class CheckOutController {
  private logger: Logger;
  constructor(
    @InjectRepository(CheckOut)
    private readonly repository: Repository<CheckOut>,
    @InjectRepository(CheckIn)
    private readonly checkIn: Repository<CheckIn>,
    @InjectRepository(Customer)
    private readonly customer: Repository<Customer>,

    ) {
      this.logger = new Logger('CheckInControllerRepository');
    }

  @Post('/:rfid')
  async create(@Param('rfid') rfid: string): Promise<CheckOut> {
    const now = new Date();
    const checkOut = new CheckOut()

    checkOut.checkin = await this.getCheckIn(rfid)

    await this.getCheckOutByCheckIn(checkOut.checkin.id)

    checkOut.time = now.toUTCString();
    console.log(checkOut)

    try {
      const c = this.repository.save(checkOut);
      return c;
    } catch (error) {
      throw new BadRequestException("Verifique se seu cartao é válido!");
    }
  }

  @Get('/:rfid')
  async find(@Param('rfid') rfid: string): Promise<CheckIn> {
    return await this.getRridOnline(rfid)
  }

  async getCheckOutByCheckIn(filter: number): Promise<Boolean> {
    const checkOut = await this.repository.findOne({
      relations: ['checkin'],
      where: [
        { checkin: { id: filter } }, 
      ],
      order: { id: 'DESC' }
    });

    if (checkOut != null) {
      throw new BadRequestException("Cliente não esta online");
    }

    return true
  }

  async getCheckIn(filter: string): Promise<CheckIn> {
    const checkIns = await this.checkIn.find({
      relations: ['customer'],
      where: [
        { customer: { rfid: filter } }, 
      ],
      order: { id: 'DESC' }
    });
    
    if (checkIns.length == 0) {
      throw new BadRequestException("Não há Checkin para este RFID");
    }

    for (let i = 0; i < checkIns.length; i++) {
      if (!checkIns[i].pago) {
        throw new BadRequestException("Pagamento pendente. Cliente ainda não passou pelo caixa");
      }
    };

    return checkIns[0]
  }

  async getRridOnline(filter: string): Promise<CheckIn> {
    const checkIn = await this.checkIn.find({
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
    const customer =  await this.customer.findOne({
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
