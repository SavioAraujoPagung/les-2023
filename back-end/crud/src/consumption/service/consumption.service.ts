import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Consumption } from "../model/consumption.entity";
import { Product } from "src/product/model/product.entity";

@Injectable()
export class ConsumptionService {
    constructor(
        @InjectRepository(Consumption)
        private readonly repository: Repository<Consumption>,
        @InjectRepository(Product)
        private readonly repositoryProduct: Repository<Product>
        ) {}
    
    async findByCheckIn(checkInId: number): Promise<Consumption[]> {
        let consumptions = await this.repository.find({where: { checkin: { id: checkInId } },})

        let tam = consumptions.length
        for (let i = 0; i < tam; i++) {
            consumptions[i].product = await this.repositoryProduct.findOne({where: {id: consumptions[i].productId}})
        }

        return consumptions
    }
}