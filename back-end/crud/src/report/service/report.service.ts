import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs';
import * as nodemailer from 'nodemailer'

import { CheckIn } from "src/checkin/model/checkin.entity";
import { CheckInService } from "src/checkin/service/checkin.service";
import { Report, ReportChopp, ReportExpense, ReportExpenses, ReportProduct, ResponseReportChopp } from "../model/report.entity";
import { Repository } from "typeorm";
import { User } from "src/users/model/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Consumption } from "src/consumption/model/consumption.entity";
import { ConsumptionService } from "src/consumption/service/consumption.service";
import { ProductService } from "src/product/service/product.service";
import { NewProduct, Product } from "src/product/model/product.entity";
@Injectable()
export class ReportService {
    @Inject(CheckInService)
    private readonly checkinSerice: CheckInService
    @Inject(ConsumptionService)
    private readonly consumptionSerice: ConsumptionService
    @Inject(ProductService)
    private readonly productService: ProductService
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) { }


    async findByTime(start: Date, end: Date): Promise<CheckIn[]> {
        try {
            var checkins: CheckIn[]
            checkins = await this.checkinSerice.findByTime(start, end)
            return checkins
        } catch (error) {
            throw new BadRequestException('Erro ao buscar dados de relatório');
        }
    }

    async findByTimeCustomerUserIDEmail(start: Date, end: Date, id: number): Promise<Report[]> {
        try {
            let user = await this.userRepo.findOne({ where: { id } })
            let reports = await this.findByTimeCustomerUserID(start, end)
            let m = await this.formatMessageUser(reports)

            await this.sendMasagemGeneric(user.email, m)
            return reports
        } catch (error) {
            throw new BadRequestException('Erro ao buscar usuario');
        }
    }

    async findByTimeCustomerUserID(start: Date, end: Date): Promise<Report[]> {
        try {
            var reports: Report[]
            reports = []
            var checkins: CheckIn[]
            checkins = await this.checkinSerice.findByTime(start, end)

            let tam = checkins.length
            for (let i = 0; i < tam; i++) {
                let report = new Report()
                let totalValue = 0

                let tamC = checkins[i].consumptions.length
                for (let j = 0; j < tamC; j++) {
                    totalValue += checkins[i].consumptions[j].price
                }

                report.customer = checkins[i].customer.name
                report.date = checkins[i].time
                report.totalValue = Number(totalValue.toFixed(2))

                reports.push(report)
            }
            reports.sort((a, b) => b.totalValue - a.totalValue);

            return reports
        } catch (error) {
            console.log(error)
            throw new BadRequestException('Erro ao buscar dados de relatório');
        }
    }

    async reportByChopp(start: Date, end: Date, sort: string): Promise<ResponseReportChopp[]> {
        if (sort != "price" && sort != "liter") {
            throw new BadRequestException('Ordenação não mapeado!');
        }

        try {
            const reports = new Map<string, ReportChopp>()
            let response: ResponseReportChopp[]
            response = []

            let consumptions = await this.consumptionSerice.findChoppByTime(start, end)
            let chopps = await this.productService.getChopps()

            let tamChopp = chopps.length
            var i: number
            for (i = 0; i < tamChopp; i++) {
                let r = new ReportChopp(chopps[i])
                reports.set(chopps[i].name, r)
            }

            let tamCons = consumptions.length
            for (i = 0; i < tamCons; i++) {
                let r = reports.get(consumptions[i].product.name.toString())
                r.totalLiter += consumptions[i].qtd
                r.totalPrice += consumptions[i].price
                r.consumptions.push(consumptions[i]);
            }

            for (i = 0; i < tamChopp; i++) {
                response.push(new ResponseReportChopp(chopps[i].name, reports.get(chopps[i].name)))
            }

            if (sort == "price") {
                response.sort((a, b) => b.report.totalPrice - a.report.totalPrice);
            }

            if (sort == "liter") {
                response.sort((a, b) => b.report.totalLiter - a.report.totalLiter);
            }

            return response
        } catch (error) {
            throw new BadRequestException('Erro ao buscar dados de relatório');
        }

    }

    async reportByExpenses(start: Date, end: Date): Promise<ReportExpenses> {
        try {
            var response: ReportExpenses
            // ganhos até o momento
            let solicitationsUntil = await this.productService.getSolicitationsAllUntil(start)
            let expenseUntil = 0 //gastos
            for (let i = 0; i < solicitationsUntil.length; i++) {
                expenseUntil += solicitationsUntil[i].totalPrice
            }

            let checkinsUntil = await this.checkinSerice.findByTimeUntil(start)
            let revenueUntil = 0 //ganhos
            for (let i = 0; i < checkinsUntil.length; i++) {
                revenueUntil += checkinsUntil[i].totalPayment
            }

            const solicitations = await this.productService.getSolicitations(start, end)
            const checkins = await this.checkinSerice.findByTime(start, end)

            // relatório por cada dia
            var timeDiff = Math.abs(start.getTime() - end.getTime());
            var amountDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var reports: ReportExpense[]
            reports = []
            for (let i = 0; i < amountDays; i++) {
                let day = new Date()
                day.setTime(start.getTime())
                day.setDate(day.getDate() + i)
                
                var s: NewProduct[]
                s = []
                var c: CheckIn[]
                c = []

                let expense = 0 //gastos
                for (let k = 0; k < solicitations.length; k++) {
                    if ((solicitations[k].created.getDate() == day.getDate()) && 
                        (solicitations[k].created.getMonth() == day.getMonth()) &&
                        (solicitations[k].created.getFullYear() == day.getFullYear())) {
                        expense += solicitations[k].totalPrice
                        s.push(solicitations[k])
                    }
                }

                let revenue = 0 //ganhos
                for (let j = 0; j < checkins.length; j++) {
                    if ((checkins[j].time.getDate() == day.getDate()) &&
                        (checkins[j].time.getMonth() == day.getMonth()) &&
                        (checkins[j].time.getFullYear() == day.getFullYear())) {
                        revenue += checkins[j].totalPayment
                        c.push(checkins[j])
                    }
                }

                reports.push(new ReportExpense(day, revenue, expense, c, s))
            }

            return new ReportExpenses(revenueUntil - expenseUntil, reports)
        } catch (error) {            
            throw new BadRequestException('Erro ao enviar relatório');
        }
    }


    async sendNotification(start: Date, end: Date): Promise<CheckIn[]> {
        try {
            var checkins: CheckIn[]
            checkins = await this.findByTime(start, end)

            await this.formatMessage(checkins)
            return checkins
        } catch (error) {
            throw new BadRequestException('Erro ao enviar relatório');
        }
    }

    async formatMessage(checkIns: CheckIn[]) {
        var message: string

        let tamCheckIns = checkIns.length
        for (let i = 0; i < tamCheckIns; i++) {
            message = 'Olá ' + checkIns[i].customer.name + ', segue o relatório de consumos.\n'
            message += 'Consumo realizado no dia: '
            message += checkIns[i].time.toLocaleString() + '\n'
            message += 'Produto - Quantidade - Valor\n'

            let tamConsumptions = checkIns[i].consumptions.length
            for (let j = 0; j < tamConsumptions; j++) {
                message += checkIns[i].consumptions[j].product.name + ' - ' + checkIns[i].consumptions[j].qtd + ' - R$' + checkIns[i].consumptions[j].price.toFixed(2) + '\n'
            }
            this.sendMasagem(checkIns[i].customer.email, message, './' + checkIns[i].id + '.txt')//TUDO MUDAR ISSO PARA PDF     
        }
    }

    async formatMessageUser(reports: Report[]): Promise<string> {
        var message: string
        message = 'Olá segue o relatório de consumos!\n'
        message += 'Cliente - Valor Consumindo - Data da Check-In\n'
        let tamReport = reports.length
        for (let i = 0; i < tamReport; i++) {
            message += reports[i].customer + ' - R$' + reports[i].totalValue + ' - ' + reports[i].date.toLocaleString() + '\n'
        }

        return message
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
            attachments: [{   // utf-8 string as an attachment
                path: fileNames
            },]
        }
        )
    }

    async sendMasagemGeneric(from: string, message: string) {
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
            to: from,
            subject: 'Relatório',
            text: message
        }
        )
    }

    async getProducts(): Promise<ReportProduct[]> {
        var report: ReportProduct[]
        report = []
        report.push(new ReportProduct("chopps", await this.productService.getChopps()))
        report.push(new ReportProduct("products", await this.productService.getProducts()))
        return report
    }

    async getProductsOnline(): Promise<Product[]> {
        let products = await this.productService.getAll()
        var report: Product[]
        report = []
        for (let i=0; i<products.length; i++) {
            if (products[i].qtd <= products[i].minQtd) {
                report.push(products[i])
            }
        }

        return report
    }
}
