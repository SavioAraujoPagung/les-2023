import { Customer } from "./Customer";
import Default from "./Default";

export type productConsumption = {
    id: number;
    name: string;
    qtd: number;
    price: number;
}

export class productCart {
    id:number | null;
    price:string;
    productConsumption:productConsumption | null;
    productId: number;
    qtd: number;

    constructor(){
        this.id = null;
        this.price = "0";
        this.productConsumption = null;
        this.productId = 0;
        this.qtd = 0;
    }

}

export default class Cart extends Default{

    productCart: Array<productCart>;
    
    isPaid: boolean;

    total:number;

    customerId: number | null;

    customer: Customer | null;

    constructor() {
        super("/cart/");
        this.productCart = new Array<productCart>();
        this.isPaid = false;
        this.customerId = null;
        this.total = 0.0;
        this.customer = null;
    }

}