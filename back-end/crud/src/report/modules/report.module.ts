import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '../controller/report.controller';
import { Report } from '../model/report.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { ReportService } from '../service/report.service';
import { CheckInModule } from 'src/checkin/modules/checkin.module';
import { User } from 'src/users/model/user.entity';
import { ConsumptionModule } from 'src/consumption/modules/consumption.module';
import { ProductModule } from 'src/product/modules/product.module';


@Module({
  imports: [TypeOrmModule.forFeature([Report, CheckIn, User]), CheckInModule, ConsumptionModule, ProductModule],
  controllers: [ReportController],
  providers: [ReportService],
})

export class ReportModule {}
