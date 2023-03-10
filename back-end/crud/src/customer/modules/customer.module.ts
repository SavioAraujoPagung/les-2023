import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from '../controller/customer.controller';
import { Customer } from '../model/customer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
})
export class CustomerModule {}
