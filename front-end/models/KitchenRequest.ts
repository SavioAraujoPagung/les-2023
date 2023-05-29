import Default from "./Default";
import { Product } from "./Products";

export default class KitchenRequest extends Default{
    // idProduct: number | null;
    foodName: string;
    barcode: string;
    status: boolean;
    product: Product;
    qtd: number;

    constructor() {
        super("/solicitationStock/");
        // this.idProduct = 0;
        this.foodName = "";
        this.barcode = "";
        this.status = true;
        this.product = new Product();
        this.qtd = 0
    }
}