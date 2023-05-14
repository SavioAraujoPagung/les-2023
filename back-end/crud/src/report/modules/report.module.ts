import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from '../controller/report.controller';
import { Report } from '../model/report.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Report, CheckIn])],
  controllers: [ReportController],
})
export class ReportModule {}
