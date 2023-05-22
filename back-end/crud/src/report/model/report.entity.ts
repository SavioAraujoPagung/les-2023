import { Consumption } from "src/consumption/model/consumption.entity";
import { Product } from "src/product/model/product.entity";

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
  revenue: number //receita
  expense: number //dispesa

  constructor(revenue: number, expense: number) {
    this.revenue = revenue
    this.expense = expense
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