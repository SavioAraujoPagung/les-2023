import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductConsumptionController } from '../controller/productConsumption.controller';
import { ProductConsumption } from '../model/productConsumption.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProductConsumption])],
  controllers: [ProductConsumptionController],
})
export class ProductConsumptionModule {}
