import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { CustomerModule } from 'src/customer/modules/customer.module';
import { CheckInController } from '../controller/checkin.controller';
import { CheckIn } from '../model/checkin.entity';
import { CheckInService } from '../service/checkin.service';
import { ConsumptionModule } from 'src/consumption/modules/consumption.module';


@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Customer]), ConsumptionModule],
  controllers: [CheckInController],
  providers: [CheckInService],
  exports: [CheckInService]
})
export class CheckInModule {}
