import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitationController } from '../controller/solicitation.controller';
import { Solicitation } from '../model/solicitation.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Solicitation])],
  controllers: [SolicitationController],
})
export class SolicitationModule {}
