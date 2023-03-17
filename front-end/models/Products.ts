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

class ProductEdit{
    name: string;
    barcode: string;
    cost: string;

    constructor() {
        this.name = "";
        this.barcode = "";
        this.cost = "";
    }
}

class StockProduct extends Default{
    barcode: string;
    name: string;
    qtd: number;

    constructor() {
        super("/stock/");
        this.name = "";
        this.barcode = "";
        this.qtd = 0;
    }

}
class SavedStockProduct{
    barcode: string;
    name: string;
    qtd: number;

    constructor() {
        this.name = "";
        this.barcode = "";
        this.qtd = 0;
    }
}

export {Product, ProductEdit, StockProduct, SavedStockProduct}