import Default from "./Default";

export default class SelfService extends Default{
    name: string;
    qtd: number;

    constructor() {
        super("/solicitation/");
        this.name = "";
        this.qtd = 0
    }
}

// export {Customer, CustomerEdit}