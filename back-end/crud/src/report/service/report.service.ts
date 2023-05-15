import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as nodemailer from 'nodemailer'

import { CheckIn } from "src/checkin/model/checkin.entity";
import { CheckInService } from "src/checkin/service/checkin.service";
@Injectable()
export class ReportService {
    @Inject(CheckInService)
    private readonly checkinSerice: CheckInService
    constructor(
    ){}

   
    async findByTime(start: Date, end: Date): Promise<CheckIn[]> {
        this.sendMasagem()
        try {
            return this.checkinSerice.findByTime(start, end)
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro ao enviar relatório');
        }
    }

    async sendMasagem() {
        const transport = nodemailer.createTransport({
                 host: 'smtp.gmail.com',
                 service: 'gmail',
                 secure: true,
                 auth: {
                     user: "lesmuitobom@gmail.com",
                 pass: "pknehltashqzwxsz"
                 }
             }
        );
        
        transport.sendMail({
                from: 'lesmuitobom@gmail.com',
                to: "savioaraujopagung14@gmail.com",
                subject: 'Relatório',
                text: "OLA MUNDO"
            }
        )

        fs.writeFile('./arquivo.txt', 'Olá, mundo!', (err) => {
            if (err) throw err;
            console.log('Arquivo criado e conteúdo salvo!');
          });
    }


}
    