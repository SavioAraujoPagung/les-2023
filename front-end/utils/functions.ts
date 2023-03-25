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

export const isset = (elem:any) => typeof elem !== "undefined" ? true : false;

export const getSubSet = (object:any, types:any) => {
    return types.reduce((obj:any, type:any) => {
        return {
        ...obj,
        [type]: object[type]
        }
    }, {});
}

export const fadeOut = (el:any) => {
    var opacity = 1; // Initial opacity
    return new Promise( resolve => { var interval = setInterval(function() {
       if (opacity > 0) {
          opacity -= 0.1;
          el.style.opacity = opacity;
       } else {
          clearInterval(interval); // Stop the interval when opacity reaches 0
          el.style.display = 'none'; // Hide the element
          resolve(5);
       }
    }, 50)
    });
}