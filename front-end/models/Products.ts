export enum ProductType {
    chopp = 1,
    selfService = 2,
    another = 3
  }
  
export class Product {
    
    id: string | null;

    name: string;
    
    path: string;

    priceCost: number;

    saleCost: number;

    minQtd: number;

    qtd: number;

    type: ProductType;

    constructor(){
        this.id = null;
        this.name = "";
        this.path = "/products/";
        this.priceCost = 0.0;
        this.minQtd = 0;
        this.saleCost = 0.0;
        this.qtd = 0.0;
        this.type = 1;
    }

}

export class ProductEdit {

    name: string;
    
    priceCost: number;

    saleCost: number;

    minQtd: number;

    type: ProductType;

    constructor(){
        this.name = "";
        this.priceCost = 0.0;
        this.minQtd = 0;
        this.saleCost = 0.0;
        this.type = 1;
    }

}

export class ProductStock {

    id: string | null;
    qtd: number;

    constructor(){
        this.id = null;
        this.qtd = 0;
    }

}

export class ProductForPrint{
    idProduct: string | null;
    product: Product;
    qtd: number;

    constructor() {
        this.idProduct = null;
        this.product = new Product();
        this.qtd = 0
    }
}