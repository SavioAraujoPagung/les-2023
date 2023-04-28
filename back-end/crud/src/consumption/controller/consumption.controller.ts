import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumption } from '../model/consumption.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
import { Product } from 'src/product/model/product.entity';
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

    ) {
      this.logger = new Logger('CustomerControllerRepository');
    }

  @Post()
  async create(@Body() consumption: Consumption): Promise<Consumption> {
    try {
      const prod = await this.product.findOne({where:{ id: consumption.product.id }})
      prod.qtd -= consumption.qtd

      consumption.product = prod

      await this.product.save(prod)

      return this.repository.save(consumption);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new BadRequestException('Cliente não encontrado!');
    }
   
  } 

  @Get('/pagar/:rfid')
  async valueConsumption(@Param('rfid') rfid: string): Promise<string> {
    try {
      const checkin = await this.getRridOnline(rfid)
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

  @Get(':rfid')
  async consumptionByRFID(@Param('rfid') rfid: string): Promise<Consumption[]> {
    try {
      const checkin = await this.getRridOnline(rfid)
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

  async getRridOnline(filter: string): Promise<CheckIn> {
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
