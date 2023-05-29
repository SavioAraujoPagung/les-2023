import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CheckIn } from "../model/checkin.entity";
import { Customer } from "src/customer/model/customer.entity";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { check } from "prettier";
import { ConsumptionService } from "src/consumption/service/consumption.service";

@Injectable()
export class CheckInService {
    constructor(
        @InjectRepository(CheckIn)
        private readonly repository: Repository <CheckIn>,
        @InjectRepository(Customer)
        private readonly repositoryCustomer: Repository<Customer>,
        private readonly consumptionService: ConsumptionService
        ) {}

    async create(rfid: string): Promise<CheckIn> {
        const checkIn = new CheckIn()
        const now = new Date();
        const customer = await this.findCustomer(rfid)
        if (!customer.active) {
            throw new BadRequestException ("Cliente está inativo") ;
        }

        checkIn.time = now;
        checkIn.customer = customer
        checkIn.totalPayment = 0

        if (await this.isOnline(rfid)) {
            throw new BadRequestException("Cliente já possui um check-in") ;
        }

        try {
            const c = this.repository.save(checkIn);
            return c;
        } catch (error) {
            throw new BadRequestException("Verifique se seu cartao é válido!");
        }
    }

    async findRridOnline(filter: string): Promise<CheckIn> {
        const checkIn = await this.repository.find({
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
    
    async findCustomer(filter: string): Promise<Customer> {
        const customer =  await this.repositoryCustomer.findOne({
          where: [
            { rfid: filter }, 
          ],
        });
    
        if (customer == null) {
          throw new BadRequestException("Cliente não encontrado");
        }
    
        return customer;
    }

    async isOnline(filter: string): Promise<boolean> {
        const checkIn = await this.repository.find({
          relations: ['customer'],
          where: [
            { customer: { rfid: filter } }, 
          ],
        });
        
        for (let i = 0; i < checkIn.length; i++) {
          if (!checkIn[i].pago) {
            return true;
          }
        };
    
        return false;
    }

    async paymentCheckin(payment: CheckIn[]): Promise<CheckIn[]> {
        for (let i = 0; i < payment.length; i++) {
          payment[i] = await this.findRridOnline(payment[i].customer.rfid);
          payment[i].pago = true;
        };
    
        for (let i = 0; i < payment.length; i++) {
          await this.repository.save(payment[i])
        };
    
        return payment
    }

    async findByTime(start: Date, end: Date): Promise<CheckIn[]> {
      var checkIns: CheckIn[]
      checkIns = await this.repository.find({
        relations: ['customer'],
        where: { 
          time: LessThan(end),
        }
      });

      let tam = checkIns.length
      for (let i = 0; i < tam; i++) {
        checkIns[i].consumptions = await this.consumptionService.findByCheckIn(checkIns[i].id)
      }
      
      return checkIns;
    }

    async findByTimeUntil(until: Date): Promise<CheckIn[]> {
      var checkIns: CheckIn[]
      checkIns = await this.repository.find({
        relations: ['customer'],
        where: { 
          time: LessThan(until),
        }
      });
      
      return checkIns;
    }
}