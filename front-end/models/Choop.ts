import Default from "./Default";

export default class extends Default{
    rfid:string;
    nome:string;
    cost:number;
    quantidade:number;

    constructor(){
        super("/choop/");
        this.rfid = "";
        this.nome = "";
        this.cost = 0.0;
        this.quantidade = 0;
    }

}