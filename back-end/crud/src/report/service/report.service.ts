import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import e from "express";
import { CheckIn } from "src/checkin/model/checkin.entity";
import { CheckInService } from "src/checkin/service/checkin.service";
@Injectable()
export class ReportService {
    @Inject(CheckInService)
    private readonly checkinSerice: CheckInService
    constructor(
    ){}

   
    async findByTime(start: Date, end: Date): Promise<CheckIn[]> {
        try {
            return this.checkinSerice.findByTime(start, end)
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro ao enviar relatório');
        }
    }
}
    