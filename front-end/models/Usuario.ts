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

export const acceptedPages = {
    1: () => true,
    2: (page:string) => {
        var page = page.toLowerCase();
        if(page === 'clientes') return true;
        return false;
    },
    3: (page:string) => {
        var page = page.toLowerCase();
        if(page === 'clientes') return true;
        return false;
    },
    4: (page:string) => {
        var page = page.toLowerCase();
        if(page === 'produto' || page === 'choop' || page === 'solicitacaocozinha') return true;
        return false;
    },
    5: (page:string) => {
        var page = page.toLowerCase();
        if(page === 'caixa') return true;
        return false;
    },
    6: () => {
        return false;
    },
    7: (page:string) => {
        var page = page.toLowerCase();
        if(['selfservice', 'solicitacaocozinha'].includes(page)) return true;
        return false;
    },
    8: (page:string) => {
        var page = page.toLowerCase();
        if('selfservice' === page) return true;
        return false;
    },
    9: () => false
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