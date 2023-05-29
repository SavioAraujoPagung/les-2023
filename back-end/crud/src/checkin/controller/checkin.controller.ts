import { Controller, Get, Post, Body, Param, NotFoundException, Logger, BadRequestException, ParseUUIDPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { Repository } from 'typeorm';
import { CheckIn } from '../model/checkin.entity';
import { CheckInService } from '../service/checkin.service';

@Controller('check-in')
export class CheckInController {
  constructor(
      private readonly checkinService: CheckInService
    ) {
    }

  @Post('/:rfid')
  async create(@Param('rfid') rfid: string): Promise<CheckIn> {
    return this.checkinService.create(rfid)
  }

  @Get('/:rfid')
  async find(@Param('rfid') rfid: string): Promise<CheckIn> {
    return await this.checkinService.findRridOnline(rfid)
  }

  @Post('/pagar/:rfid')
  async paymentCheckin(@Body() payment: CheckIn[]): Promise<CheckIn[]> {
    return this.checkinService.paymentCheckin(payment)
  }
}
