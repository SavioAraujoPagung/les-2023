import { Customer } from "./Customer";
import Default from "./Default";

export type ItemCart = {
    name: string;
    qtd: number;
    price: number;
}

export default class Cart extends Default{

    productsConsumption: ItemCart[];
    
    isPaid: boolean;

    customerId: number | null;

    customer: Customer | null;

    constructor() {
        super("/cart/");
        this.productsConsumption = [];
        this.isPaid = false;
        this.customerId = null;
        this.customer = null;
    }

}