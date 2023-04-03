class Customer{
    rfid: string;
    name: string;
    path: string;
    cpf: string;
    phone: string;
    email: string;
    dateBirth: string;

    constructor() {
        this.rfid = "";
        this.name = "";
        this.path = "/customer/";
        this.cpf = "";
        this.phone = "";
        this.email = "";
        this.dateBirth = "";
    }
}

class CustomerEdit{
    rfid: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    dateBirth: string;

    constructor() {
        this.rfid = "";
        this.name = "";
        this.cpf = "";
        this.phone = "";
        this.email = "";
        this.dateBirth = "";
    }
}

export {Customer, CustomerEdit}