import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/model/customer.entity';
import { CustomerModule } from 'src/customer/modules/customer.module';
import { CheckInController } from '../controller/checkin.controller';
import { CheckIn } from '../model/checkin.entity';
import { CheckInService } from '../service/checkin.service';


@Module({
  imports: [TypeOrmModule.forFeature([CheckIn, Customer])],
  controllers: [CheckInController],
  providers: [CheckInService]
})
export class CheckInModule {}
