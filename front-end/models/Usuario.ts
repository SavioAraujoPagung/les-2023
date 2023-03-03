import Default from "./Default";

class Usuario extends Default{
    nome: string;
    cargo: number

    constructor() {
        super("/diretor/");
        this.nome = "";
        this.cargo = 0;
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

export {Usuario, Cargos}