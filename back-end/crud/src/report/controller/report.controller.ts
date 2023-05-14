import { Controller, Post, Body, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Repository } from 'typeorm';

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
  private logger: Logger;
  constructor(
    @InjectRepository(CheckIn)
    private readonly repository: Repository<CheckIn>
    ) {
      this.logger = new Logger('ReportControllerRepository');
    }

  @Post()
  async create(@Body() c: CheckIn): Promise<CheckIn> {
    try {
      
      return 
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um produto. ${error}`);
      throw new BadRequestException('Erro ao cadastrar um produto');
    }
  }

}
