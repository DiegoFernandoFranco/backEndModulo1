class ProductManager { 
    constructor () {
        this.products = [];
    }   
    idAuto = 0;    
    
    addProduct (product) {
        let temp = {...product};
        
        try {            
        if (Object.values(temp).includes(undefined) || Object.values(temp).includes('')) {
            throw new Error ('No se agrego el producto por datos incompletos')    
        }    
                
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].code === temp.code) {       
                    throw new Error ('Campo Code Repetido, no se puede agregar el Producto')
                };
            }
            
            this.idAuto = this.idAuto + 1; 
            this.products.push({id: this.idAuto, ...temp})
        }   catch (error) {
                console.log(error);
            }
    };
    
    getProducts () {
        return this.products;
    }
    
    getProductById (id) {
        const busqueda = this.products.find((prodBuscado) => prodBuscado.id === id); 

        // En la consigna dice mostrar por consola!!!
        // !busqueda ? console.log('Not Found') : console.log(busqueda);

        // sino dejo un if con return.
        
        if (!busqueda) {
            return('Not Found') 
        }   else {
            return busqueda;
        };
    }
};

const productoPrueba = new ProductManager;

// muestra los productos agregados -- esta vacio todavia.
console.log(productoPrueba.getProducts());

//se prueba que si un campo esta undefined -- no lo agrega -- tira error, puse un catch asi no se rompe el programa.
// productoPrueba.addProduct({title: 'producto prueba1', description: 'Este es un producto prueba1', price: 600, thumbnail: 'sin imagen1', code: 'abc122'});

//se prueba que si un valor de un campo esta vacio '' -- no lo agrega -- tira error, puse un catch asi no se rompe el programa.
productoPrueba.addProduct({title: '', description: 'Este es un producto prueba1', price: 600, thumbnail: 'sin imagen1', code: 'abc123', stock: 75});


productoPrueba.addProduct({title: 'producto prueba2', description: 'Este es un producto prueba2', price: 600, thumbnail: 'sin imagen2', code: 'abc123', stock: 75});
productoPrueba.addProduct({title: 'producto prueba3', description: 'Este es un producto prueba3', price: 600, thumbnail: 'sin imagen3', code: 'abc124', stock: 75});
productoPrueba.addProduct({title: 'producto prueba4', description: 'Este es un producto prueba4', price: 600, thumbnail: 'sin imagen4', code: 'abc124', stock: 75});
productoPrueba.addProduct({title: 'producto prueba5', description: 'Este es un producto prueba5', price: 600, thumbnail: 'sin imagen5', code: 'abc123', stock: 75});
productoPrueba.addProduct({title: 'producto prueba6', description: 'Este es un producto prueba6', price: 600, thumbnail: 'sin imagen6', code: 'abc125', stock: 75});
productoPrueba.addProduct({title: 'producto prueba7', description: 'Este es un producto prueba7', price: 600, thumbnail: 'sin imagen7', code: 'abc126', stock: 75});

// muestra los productos agregados
console.log(productoPrueba.getProducts());

console.log(productoPrueba.getProductById(2));

// el producto no existe, devuelve Not Found
console.log(productoPrueba.getProductById(51));
