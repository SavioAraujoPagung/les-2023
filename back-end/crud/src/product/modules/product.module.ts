import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from '../controller/product.controller';
import { NewProduct, Product } from '../model/product.entity';
import { ProductService } from '../service/product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Product, NewProduct])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
