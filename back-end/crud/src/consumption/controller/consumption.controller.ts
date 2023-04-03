import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumption } from '../model/Consumption.entity';
import { ProductConsumption } from 'src/productConsumption/model/ProductConsumption.entity';
import { CheckIn } from 'src/checkin/model/checkin.entity';
@Controller('consumption')
export class ConsumptionController {
  private logger: Logger;
  constructor(
    @InjectRepository(Consumption)
    private readonly repository: Repository<Consumption>,

    @InjectRepository(ProductConsumption)
    private readonly product: Repository<ProductConsumption>,

    @InjectRepository(CheckIn)
    private readonly checkin: Repository<CheckIn>,

    ) {
      this.logger = new Logger('CustomerControllerRepository');
    }

  @Post()
  async create(@Body() consumption: Consumption): Promise<Consumption> {
    try {
      const prod = await this.product.findOne({where:{ id: consumption.productConsumption.id }})
      prod.qtd -= consumption.qtd
      await this.product.save(prod)

      return this.repository.save(consumption);
    } catch (error) {
      this.logger.error(`Não foi possivel cadastrar um cliente. ${error}`);
      throw new BadRequestException('Cliente não encontrado!');
    }
   
  } 

  @Get(':rfid')
  async valueConsumption(@Param('rfid', ParseIntPipe) rfid: string): Promise<string> {
    try {
      console.log(rfid)
      const checkin = await this.getRridOnline(rfid)
      console.log(checkin)
      const consumptions = await this.repository.find({where: { checkin: { id: checkin.id } },})
      console.log(consumptions)

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
