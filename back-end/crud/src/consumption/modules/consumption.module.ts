import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionController } from '../controller/consumption.controller';
import { Consumption } from '../model/consumption.entity';
import { ProductConsumption } from 'src/productConsumption/model/ProductConsumption.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Consumption, ProductConsumption])],
  controllers: [ConsumptionController],
})
export class ConsumptionModule {}
