import Default from "./Default";
import { Customer } from "./Customer";

class Checkin extends Default{
    rfid: string;

    status: boolean;
    
    customer_id: string;

    customer: Customer;

    constructor() {
        super("/check-in/");
        this.rfid = "";
        this.status = true;
        this.customer_id = "";
        this.customer = new Customer();
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

// class CheckinSave extends Default{
//     rfid: string;

//     status: boolean;
    
//     customer_id: string;

//     constructor() {
//         super("/rfid/");
//         this.rfid = "";
//         this.status = true;
//         this.customer_id = "";
//     }
// }

export {Checkin, CustomerEdit}