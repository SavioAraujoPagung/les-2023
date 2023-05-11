import Default from "./Default";

export enum UserType {
    Administrador = 1,
    Caixa = 5,
    Cliente = 6,
    Cozinheiro = 7,
    FiscalSaida = 2,
    FiscalEntrada = 3,
    FiscalSelfService = 8,
    Repositor = 4,
    Usuarios = 9
}
class Usuario extends Default{
    name: string;
    email: string;
    gender: string;
    office: UserType;
    password: string;

    constructor() {
        super("/users/");
        this.name = "";
        this.email = "";
        this.gender = "";
        this.office = UserType.Usuarios;
        this.password = "";
    }

}

class UsuarioEdit{
    name: string;
    email: string;
    gender: string;
    office: UserType;
    password: string;

    constructor() {
        this.name = "";
        this.email = "";
        this.gender = "";
        this.office = UserType.Usuarios;
        this.password = "";
    }

}

class UsuarioAuth{
    email: string;
    password: string;

    constructor() {
        this.email = "";
        this.password = "";
    }

}

export {Usuario, UsuarioEdit, UsuarioAuth}