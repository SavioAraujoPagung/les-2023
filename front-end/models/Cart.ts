import { Customer } from "./Customer";
import Default from "./Default";

export type ItemCart = {
    name: string;
    finalPrice: number
}

export default class Cart extends Default{

    itensCart: ItemCart[];
    
    isPaid: boolean;

    customerId: number | null;

    customer: Customer | null;

    constructor() {
        super("/cart/");
        this.itensCart = [];
        this.isPaid = false;
        this.customerId = null;
        this.customer = null;
    }

}