import Default from "./Default";

class Usuario extends Default{
    name: string;
    email: string;
    gender: string;
    office: string;
    password: string;

    constructor() {
        super("/users/");
        this.name = "";
        this.email = "";
        this.gender = "";
        this.office = "";
        this.password = "";
    }

}

class UsuarioEdit{
    name: string;
    email: string;
    gender: string;
    office: string;
    password: string;

    constructor() {
        this.name = "";
        this.email = "";
        this.gender = "";
        this.office = "";
        this.password = "";
    }

}

enum Cargos{
    "Administrador" = 1,
    "Fiscal de entrada" = 2,
    "Fiscal de saída" = 3,
    "Repositor" = 4,
    "Caixa" = 5,
    "Fiscal de Self-Service" = 6,
    "Cozinheiro" = 7,
}

export {Usuario, UsuarioEdit,Cargos}