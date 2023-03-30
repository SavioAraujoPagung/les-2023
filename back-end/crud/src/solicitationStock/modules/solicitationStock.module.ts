import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { solicitationStockController } from '../controller/solicitationStock.controller';
import { SolicitationStock } from '../model/solicitationStock.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitationStock]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [solicitationStockController],
})
export class SolicitationStockModule {}
