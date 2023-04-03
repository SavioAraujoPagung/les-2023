import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { CheckOutController } from '../controller/checkout.controller';
import { CheckOut } from '../model/checkout.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, CheckOut, Customer])],
  controllers: [CheckOutController],
})
export class CheckOutModule {}
