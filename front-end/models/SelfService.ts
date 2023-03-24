import Default from "./Default";

export default class SelfService extends Default{
    foodName: string;
    status: boolean;
    qtd: number;

    constructor() {
        super("/solicitation/");
        this.foodName = "";
        this.status = false;
        this.qtd = 0
    }
}
