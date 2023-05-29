import { Checkin } from "./Checkin";
import Default from "./Default";
import { Product } from "./Products";

export class Consumption extends Default{
    
    checkin: Checkin;
    product: Product;
    productId: string; 
    qtd: number; 
    price: number;

    constructor(){
        super('/consumption/');
        this.checkin = new Checkin();
        this.product = new Product();
        this.productId = "";
        this.qtd = 0;
        this.price = 0.0;
    }



}