import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChoppStockController } from '../controller/choppStock.controller';
import { ChoppStock } from '../model/choppStock.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChoppStock]),
  ],
  controllers: [ChoppStockController],
})
export class ChoppStockModule {}
