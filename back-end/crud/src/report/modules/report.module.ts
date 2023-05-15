import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '../controller/report.controller';
import { Report } from '../model/report.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { ReportService } from '../service/report.service';
import { CheckInModule } from 'src/checkin/modules/checkin.module';


@Module({
  imports: [TypeOrmModule.forFeature([Report, CheckIn]), CheckInModule],
  controllers: [ReportController],
  providers: [ReportService],
})

export class ReportModule {}
