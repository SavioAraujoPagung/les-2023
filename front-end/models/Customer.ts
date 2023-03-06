import Default from "./Default";

class Customer extends Default{
    name: string;
    cpf: string;
    phone: string;
    email: string;
    dateBirth: string;

    constructor() {
        super("/customer/");
        this.name = "";
        this.cpf = "";
        this.phone = "";
        this.email = "";
        this.dateBirth = "";
    }
}

class CustomerEdit{
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

export {Customer, CustomerEdit}