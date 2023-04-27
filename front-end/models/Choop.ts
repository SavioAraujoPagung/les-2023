import Default from "./Default";

class Choop extends Default{
    name: string;
    rfid: string;
    cost: number;
    qtd: number;

    constructor() {
        super("/choop/");
        this.name = "";
        this.rfid = "";
        this.cost = 0.0;
        this.qtd = 0;
    }

}

class ChoopEdit{
    name: string;
    rfid: string;
    cost: string;

    constructor() {
        this.name = "";
        this.rfid = "";
        this.cost = "";
    }
}

// class ChoopForPrint{
//     idProduct: number | null;
//     product: Product;
//     qtd: number;

//     constructor() {
//         this.idProduct = 0;
//         this.product = new Product();
//         this.qtd = 0
//     }
// }

class StockChoop extends Default{
    rfid: string;
    name: string;
    qtd: number;

    constructor() {
        super("/choop/stock");
        this.name = "";
        this.rfid = "";
        this.qtd = 0;
    }

}
class SavedStockChoop{
    rfid: string;
    name: string;
    qtd: number;

    constructor() {
        this.name = "";
        this.rfid = "";
        this.qtd = 0;
    }
}

export {Choop, ChoopEdit, StockChoop, SavedStockChoop}