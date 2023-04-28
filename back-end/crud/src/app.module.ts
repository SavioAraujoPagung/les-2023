import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './checkin/model/checkin.entity';
import { CheckInModule } from './checkin/modules/checkin.module';
import { Customer } from './customer/model/customer.entity';
import { CustomerModule } from './customer/modules/customer.module';
import { Product } from './product/model/product.entity';
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
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'les2023',
      database: 'les2023',
      entities: [User, Customer, Product, CheckIn, Solicitation, SolicitationStock, Consumption, CheckOut],
      synchronize: true,
      autoLoadEntities: true,
    }),  
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService, UserRepository],
})
export class AppModule {}
