import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionController } from '../controller/consumption.controller';
import { Consumption } from '../model/consumption.entity';
import { Product } from 'src/product/model/product.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { ConsumptionService } from '../service/consumption.service';


@Module({
  imports: [TypeOrmModule.forFeature([Consumption, Product, CheckIn])],
  controllers: [ConsumptionController],
  providers: [ConsumptionService],
  exports: [ConsumptionService]
})
export class ConsumptionModule {}
