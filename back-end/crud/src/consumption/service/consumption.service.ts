import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from 'typeorm';

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Consumption } from "../model/consumption.entity";
import { Product } from "src/product/model/product.entity";
import { CheckIn } from "src/checkin/model/checkin.entity";
import { CheckInService } from "src/checkin/service/checkin.service";

@Injectable()
export class ConsumptionService {
    constructor(
        @InjectRepository(Consumption)
        private readonly repository: Repository<Consumption>,
        @InjectRepository(Product)
        private readonly repositoryProduct: Repository<Product>,
        @InjectRepository(CheckIn)
        private readonly checkInRepo: Repository<CheckIn>
        ) {}
    
    async findByCheckIn(checkInId: number): Promise<Consumption[]> {
        let consumptions = await this.repository.find({where: { checkin: { id: checkInId } },})

        let tam = consumptions.length
        for (let i = 0; i < tam; i++) {
            consumptions[i].product = await this.repositoryProduct.findOne({where: {id: consumptions[i].productId}})
        }

        return consumptions
    }

    //Relatório dos chopes mais consumidos em um determinado período
    async findChoppByTime(start: Date, end: Date): Promise<Consumption[]> {
        return this.repository.find(
            {
                relations: ['product'],
                where: { 
                    created: MoreThan(start) && LessThan(end),
                },
                order: { id: 'DESC' }
            }
        )
    }

    async getCPFOnline(cpf: string): Promise<CheckIn> {
        const checkIn = await this.checkInRepo.find({
            relations: ['customer'],
            where: [
              { customer: { cpf } }, 
            ],
          });
          
          for (let i = 0; i < checkIn.length; i++) {
            if (!checkIn[i].pago) {
              return checkIn[i];
            }
          };
      
          throw new NotFoundException("Não há checkin para este CPF!");
    }
}