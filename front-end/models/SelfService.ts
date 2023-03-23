import Default from "./Default";

export default class SelfService extends Default{
    name: string;
    qtd: number;

    constructor() {
        super("/selfService/");
        this.name = "";
        this.qtd = 0
    }
}

// export {Customer, CustomerEdit}