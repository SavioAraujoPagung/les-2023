import { Controller, Query, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Repository } from 'typeorm';
import { ReportService } from '../service/report.service';
import { Report, ReportChopp, ResponseReportChopp } from '../model/report.entity';
import { Consumption } from 'src/consumption/model/consumption.entity';

/*
- Relatório que descreva o saldo de cada produto do estoque da cozinha e do chopp; 
Saldo é quanto que eu tenho em estoque?
- Relatório que demonstre somente os produtos que estão com estoque no momento da encomenda;
Nao entendi. ???
- Relatório dos chopes mais consumidos em um determinado período; [OK]
- Relatório listando o nome do cliente e o valor comprado em um intervalo de data, ordenado pelo valor; [OK]
- Opção de envio de e-mail para todos os clientes que compraram em um determinado período de tempo. O texto deve ser informado no momento do envio;
- Relatório que demonstre a receita x despesas em um período.
*/

@Controller('report')
export class ReportController {
  constructor(
    private readonly service: ReportService
    ) {
    }

  @Get()
  async findByTime(@Query('start') start: string, @Query('end') end: string): Promise<CheckIn[]> {
    
    return this.service.sendNotification(new Date(start), new Date(end))
  }
  
  @Get('data')
  async findByTimeConsulta(@Query('start') start: string, @Query('end') end: string): Promise<CheckIn[]> {
    
    return this.service.findByTime(new Date(start), new Date(end))
  }

  @Get('chopp')
  async findByChopp(
    @Query('start') start: string, 
    @Query('end') end: string): Promise<ResponseReportChopp[]> 
  {
    let response = await this.service.reportByChopp(new Date(start), new Date(end))
    console.log("🚀 ~ file: report.controller.ts:45 ~ ReportController ~ response:", response)
    
    return response
  }

  @Get('user')
  async findByTimeCustomerUserID(
    @Query('start') start: string, 
    @Query('end') end: string, 
    @Query('userid') userId: number, 
    @Query('email') email: true): Promise<Report[]> 
  {
    if (email) {
      return this.service.findByTimeCustomerUserIDEmail(new Date(start), new Date(end), userId)
    }
    return this.service.findByTimeCustomerUserID(new Date(start), new Date(end))
  }

}
