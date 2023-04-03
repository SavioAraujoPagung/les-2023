import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionController } from '../controller/consumption.controller';
import { Consumption } from '../model/consumption.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Consumption])],
  controllers: [ConsumptionController],
})
export class ConsumptionModule {}
