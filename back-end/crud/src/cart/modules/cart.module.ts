import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Customer } from 'src/customer/model/customer.entity';
import { CartController } from '../controller/cart.controller';
import { Cart } from '../model/cart.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cart, CheckIn, Customer])],
  controllers: [CartController],
})
export class CartModule {}
