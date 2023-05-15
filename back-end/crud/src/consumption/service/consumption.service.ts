import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import { Customer } from "src/customer/model/customer.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { check } from "prettier";
import { Consumption } from "../model/consumption.entity";

@Injectable()
export class ConsumptionService {
    constructor(
        @InjectRepository(Consumption)
        private readonly repository: Repository<Consumption>
        ) {}
    
    async findByCheckIn(checkInId: number): Promise<Consumption[]> {
        return await this.repository.find({where: { checkin: { id: checkInId } },})
    }
}