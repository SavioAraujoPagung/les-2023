import Default from "./Default";

class Product extends Default{
    name: string;
    barcode: string;
    cost: number;

    constructor() {
        super("/products/");
        this.name = "";
        this.barcode = "";
        this.cost = 0.0;
    }

}

export {Product}