import Default from "./Default";

class Cliente extends Default{
    name: string;
    cpf: string;
    phone: string;
    email: string;
    dateBirth: string;

    constructor() {
        super("/cliente/");
        this.name = "";
        this.cpf = "";
        this.phone = "";
        this.email = "";
        this.dateBirth = "";
    }
}

class ClientEdit{
    name: string;
    cpf: string;
    phone: string;
    email: string;
    dateBirth: string;

    constructor() {
        this.name = "";
        this.cpf = "";
        this.phone = "";
        this.email = "";
        this.dateBirth = "";
    }
}

export {Cliente, ClientEdit}