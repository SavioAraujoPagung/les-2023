import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './checkin/model/checkin.entity';
import { CheckInModule } from './checkin/modules/checkin.module';
import { Customer } from './customer/model/customer.entity';
import { CustomerModule } from './customer/modules/customer.module';
import { NewProduct, Product } from './product/model/product.entity';
import { ProductModule } from './product/modules/product.module';
import { Solicitation } from './solicitation/model/solicitation.entity';
import { SolicitationModule } from './solicitation/modules/solicitation.module';
import { SolicitationStock } from './solicitationStock/model/solicitationStock.entity';
import { SolicitationStockModule } from './solicitationStock/modules/solicitationStock.module';
import { Consumption } from './consumption/model/consumption.entity';
import { User } from './users/model/user.entity';
import { UserModule } from './users/modules/user.module';
import { ConsumptionModule } from './consumption/modules/consumption.module';
import { CheckOut } from './checkout/model/checkout.entity';
import { CheckOutModule } from './checkout/modules/checkout.module';
import { ReportModule } from './report/modules/report.module';
import { Report } from './report/model/report.entity';


@Module({
  imports: [
    UserModule, 
    CustomerModule, 
    ProductModule, 
    CheckInModule,
    CheckOutModule, 
    SolicitationModule,
    SolicitationStockModule,
    ConsumptionModule,
    ReportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'les2023',
      database: 'les2023',
      entities: [User, Customer, Product, NewProduct, CheckIn, Solicitation, SolicitationStock, Consumption, CheckOut, Report],
      synchronize: true,
      autoLoadEntities: true,
    }),  
  ],
  providers: [],
})
export class AppModule {}
