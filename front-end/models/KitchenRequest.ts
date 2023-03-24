import Default from "./Default";
import { Product } from "./Products";

export default class KitchenRequest extends Default{
    idProduct: number | null;
    product: Product;
    qtd: number;

    constructor() {
        super("/solicitation/");
        this.idProduct = 0;
        this.product = new Product();
        this.qtd = 0
    }
}