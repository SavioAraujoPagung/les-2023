import { Choop } from "./Choop";
import { Consumption } from "./Consumption";
import { Customer } from "./Customer";
import Default from "./Default";
import { Product } from "./Products";

export class ReportForCostumer extends Default{
    pago: boolean;
    time: Date;
    customer: Customer;
    consumptions: Array<Consumption>

    constructor(){
        super("/report/");
        this.pago = false;
        this.time = new Date();
        this.customer = new Customer();
        this.consumptions = new Array<Consumption>();
    }
}

export class ReportForUser extends Default{
    customer: string;
    date: string;
    totalValue:number;

    constructor(){
        super("/report/");
        this.customer = "";
        this.date = "";
        this.totalValue = 0;
    }
}

class ReportForChopp{
    chopp: Choop;
    consumptions: Array<Consumption>;
    totalPrice:number;
    totalLiter:number;

    constructor(){
        this.chopp = new Choop();
        this.consumptions = new Array<Consumption>();
        this.totalPrice = 0;
        this.totalLiter = 0;
    }
}
export class ChoppReport extends Default{
    key: string;
    report: ReportForChopp;

    constructor(){
        super("/report/chopp");
        this.key = "";
        this.report = new ReportForChopp();
    }
}

export class ExpenseProfitReport extends Default{
    revenue: number;
    expense: number;

    constructor(){
        super("/report/expenses");
        this.revenue = 0;
        this.expense = 0;
    }
}
export class ProductsBalanceReport extends Default{
    type: string;
    products: Array<Product>;

    constructor(){
        super("/report/expenses");
        this.type = "";
        this.products = new Array<Product>();
    }
}