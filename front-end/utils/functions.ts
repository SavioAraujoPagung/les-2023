export const formatDate = (date:Date) => {
    return new Date(date).toLocaleDateString("pt-BR");
};

export const geraStringAleatoria = (tamanho:number) => {
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return stringAleatoria;
}

// export default {formatDate, geraStringAleatoria};