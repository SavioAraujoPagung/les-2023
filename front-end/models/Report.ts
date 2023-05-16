import { Consumption } from "./Consumption";
import { Customer } from "./Customer";
import Default from "./Default";

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