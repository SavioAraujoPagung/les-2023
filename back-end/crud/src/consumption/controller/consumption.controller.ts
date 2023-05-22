import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumption } from '../model/consumption.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Product } from 'src/product/model/product.entity';
import { ConsumptionService } from '../service/consumption.service';
@Controller('consumption')
export class ConsumptionController {
  private logger: Logger;
  constructor(
    @InjectRepository(Consumption)
    private readonly repository: Repository<Consumption>,

    @InjectRepository(Product)
    private readonly product: Repository<Product>,

    @InjectRepository(CheckIn)
    private readonly checkin: Repository<CheckIn>,

    private readonly service: ConsumptionService,

    ) {
      this.logger = new Logger('CustomerControllerRepository');
    }

  @Post()
  async create(@Body() consumption: Consumption): Promise<Consumption> {
    var prod :Product
    try {
      prod = await this.product.findOne({where:{ id: consumption.product.id }})
      if (!prod) {
        throw new BadRequestException('Produto não encontrado!');  
      }
    } catch (error) {
      throw new BadRequestException('Produto não encontrado!');
    }

    var checkIn :CheckIn
    try {
      checkIn = await this.checkin.findOne({where: {id: consumption.checkin.id}})
      if (!checkIn) {
        throw new BadRequestException('Checkin não encontrado!');
      }
      consumption.checkin = checkIn
    } catch (error) {
      throw new BadRequestException('Checkin não encontrado!');
    }
    
    if (checkIn.pago) {
      throw new BadRequestException('CheckIn já finalizado!');
    }

    if (prod.type == 1) {
      const qtd = prod.qtd - consumption.qtd
      if (qtd < 0) {
        consumption.qtd = prod.qtd
        prod.qtd = 0
        consumption.product = prod
      } else {
        prod.qtd = qtd
        consumption.product = prod
      }
      consumption.price = prod.saleCost * consumption.qtd
    }
    if (prod.type == 2) {
      consumption.product = prod
      consumption.price = prod.saleCost * consumption.qtd
    }

    consumption.created = new Date();
    checkIn.totalPayment += consumption.price

    await this.checkin.save(checkIn)
    await this.product.save(prod)
    return this.repository.save(consumption);
  } 

  @Get('/pagar/:rfid')
  async valueConsumption(@Param('rfid') rfid: string): Promise<string> {
    try {
      const checkin = await this.getRfidOnline(rfid)
      const consumptions = await this.repository.find({where: { checkin: { id: checkin.id } },})
      let value = 0

      for (let i = 0; i < consumptions.length; i++) {
        value += consumptions[i].price;
      }
      
      return value.toString()
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new BadRequestException('Impossível consultar valor consumido!');
    }
  } 

  @Get('/microterminal/:cpf')
  async valueConsumptionMicroterminal(@Param('cpf') cpf: string): Promise<string> {
    try {
      const checkin = await this.service.getCPFOnline(cpf)
      const consumptions = await this.repository.find({where: { checkin: { id: checkin.id } },})
      let value = 0

      for (let i = 0; i < consumptions.length; i++) {
        value += consumptions[i].price;
      }
      return value.toFixed(2).toString()
    } catch (error) {
      throw new BadRequestException('Impossível consultar valor consumido!');
    }
  } 

  @Get(':rfid')
  async consumptionByRFID(@Param('rfid') rfid: string): Promise<Consumption[]> {
    try {
      const checkin = await this.getRfidOnline(rfid)
      const consumptions = await this.repository.find({
        where: { 
          checkin: { id: checkin.id }
        },
      })

      for (let i = 0; i < consumptions.length; i++) {
        console.log(consumptions[i].product)
        consumptions[i].product = await this.product.findOne({where: {id: consumptions[i].productId }})
      };

      return consumptions

    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new BadRequestException('Impossível consultar valor consumido!');
    }
  } 

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() consumption: Consumption): Promise<Consumption> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    await this.repository.update({id}, consumption)
    return this.repository.findOne({where:{ id }})
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const userFound = await this.repository.findOne({where:{ id }});
    if(!userFound){
      throw new NotFoundException('Cliente não encontrado! Tente novamente!')
    }
    const userDeleted = await this.repository.delete({id})

    if(userDeleted.affected > 0){
      return `Cliente ${id} deletado com sucesso!`;
    }
  }

  async getRfidOnline(filter: string): Promise<CheckIn> {
    const checkIn = await this.checkin.find({
      relations: ['customer'],
      where: [
        { customer: { rfid: filter } }, 
      ],
    });
    
    for (let i = 0; i < checkIn.length; i++) {
      if (!checkIn[i].pago) {
        return checkIn[i];
      }
    };

    throw new NotFoundException("Não há checkin para este RFID!");
  }
}
