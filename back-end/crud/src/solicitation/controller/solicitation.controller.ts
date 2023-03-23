import { Controller, Get, Post, Put, Delete, Body, Param, Inject, ParseIntPipe, NotFoundException, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Solicitation } from '../model/solicitation.entity';

@Controller('solicitation')
export class SolicitationController {
  private logger: Logger;
  constructor(
    @InjectRepository(Solicitation)
    private readonly repository: Repository<Solicitation>
    ) {
      this.logger = new Logger('SolicitationControllerRepository');
    }

  @Post()
  async create(@Body() user: Solicitation[]): Promise<Solicitation[]> {
    try {
      return this.repository.save(user);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar a Solicitação de comida. ${error}`);
      throw new Error('Erro ao cadastrar a Solicitação de comida');
    }
  }

  @Get('/status')
  async findAllWithStatusTrue(): Promise<Solicitation[]> {
    return this.repository.find({where:{status:true}});
  }
  
  @Get()
  async findAll(): Promise<Solicitation[]> {
    return this.repository.find();
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number): Promise<Solicitation[]> {
    const solicitationFound = await this.repository.findOne({where:{ id, status:true}});

    if(!solicitationFound){
      throw new NotFoundException('Solicitação não encontrada! Tente novamente!')
    }

    await this.repository.update({id},{status:false})
    return this.findAllWithStatusTrue();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const solicitationFound = await this.repository.findOne({where:{ id }});
    if(!solicitationFound){
      throw new NotFoundException('Solicitação não encontrado! Tente novamente!')
    }
    const solicitationDeleted = await this.repository.delete({id})

    if(solicitationDeleted.affected > 0){
      return `Solicitação ${id} deletado com sucesso!`;
    }
  }

}
