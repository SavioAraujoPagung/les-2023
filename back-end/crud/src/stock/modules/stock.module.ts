import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/model/product.entity';
import { StockController } from '../controller/stock.controller';
import { Stock } from '../model/stock.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Stock, Product])],
  controllers: [StockController],
})
export class StockModule {}
