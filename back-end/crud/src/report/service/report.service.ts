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
        try {
            var checkins: CheckIn[]
            checkins = await this.checkinSerice.findByTime(start, end)
            await this.formatMessage(checkins)

            return this.checkinSerice.findByTime(start, end)
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro ao enviar relatório');
        }
    }

    async formatMessage(checkIns: CheckIn[]) {
        var message: string

        let tamCheckIns = checkIns.length
        for (let i = 0; i < tamCheckIns; i++) {
            message = 'Olá ' + checkIns[i].customer.name + ', segue o relatório de consumos.\n'
            message += 'Consumo realizado no dia: '
            message += checkIns[i].time.toString + '\n'
            message += 'Produto - Quantidade - Valor\n'

            let tamConsumptions = checkIns[i].consumptions.length
            for (let j = 0; j < tamConsumptions; j++) {
                message += checkIns[i].consumptions[j].product.name + ' - ' + checkIns[i].consumptions[j].qtd +  ' - ' + checkIns[i].consumptions[j].price + '\n'
            }
            this.sendMasagem(checkIns[i].customer.email, message, './' + checkIns[i].id + '.txt')//TUDO MUDAR ISSO PARA PDF     
        }
    }

    async sendMasagem(from: string, message: string, fileNames: string) {
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

        fs.writeFile(fileNames, message, (err) => { //TODO: ADD ESSE ARQUIVO AO ENEXO DO EMAIL
            if (err) throw err;
            console.log('Arquivo criado e conteúdo salvo!');
        });
        
        transport.sendMail({
                from: 'lesmuitobom@gmail.com',
                to: from,
                subject: 'Relatório',
                text: message,
                attachments:[ {   // utf-8 string as an attachment
                    path: fileNames
                },]
            }
        )

        
    }


}
    