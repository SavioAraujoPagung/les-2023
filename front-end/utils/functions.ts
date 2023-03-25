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

export const printDoc = (id:string) => {
// Get HTML to print from element
    const prtHtml = document.getElementById(id)?.innerHTML;

    // Get all stylesheets HTML
    let stylesHtml = '';
    for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
    stylesHtml += node.outerHTML;
    }

    // Open the print window
    const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

    WinPrint?.document.write(`<!DOCTYPE html>
    <html>
    <head>
        ${stylesHtml}
    </head>
    <body>
        ${prtHtml}
    </body>
    </html>`);

    WinPrint?.document.close();
    WinPrint?.focus();
    WinPrint?.print();
    WinPrint?.close();
}