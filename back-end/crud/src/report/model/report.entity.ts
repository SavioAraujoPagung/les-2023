import { CheckIn } from "src/checkin/model/checkin.entity";
import { Consumption } from "src/consumption/model/consumption.entity";
import { NewProduct, Product } from "src/product/model/product.entity";

export class Report {
  customer: string;
  totalValue: number;
  date: Date;
}

export class ReportChopp {
  chopp: Product;
  consumptions: Consumption[]
  totalPrice: number;
  totalLiter: number;

  constructor(chopp: Product) {
    this.chopp= chopp;
    this.consumptions = []
    this.totalPrice = 0;
    this.totalLiter = 0;
  }
}

export class ResponseReportChopp {
  key: string;
  report: ReportChopp
  
  constructor(key: string, report: ReportChopp) {
    this.key = key
    this.report = report
  }
}

export class ReportExpenses {
  revenue: number //receita ate o periodo 
  reportExpenses: ReportExpense[]

  constructor(revenue: number, reportExpenses: ReportExpense[]) {
    this.revenue = revenue
    this.reportExpenses = reportExpenses
  }
}

export class ReportExpense {
  day: Date //relatorio do dia
  revenue: number //receita
  expense: number //dispesa
  checkins: CheckIn[]
  products: NewProduct[]

  constructor(day: Date, revenue: number, expense: number, checkins: CheckIn[], products: NewProduct[]) {
    this.day = day
    this.revenue = revenue
    this.expense = expense
    this.checkins = checkins
    this.products = products
  }
}

export class ReportProduct {
  type: string 
  products: Product[] 

  constructor(type: string, products: Product[]) {
    this.type = type
    this.products = products
  }
}