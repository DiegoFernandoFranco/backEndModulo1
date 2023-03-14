class ProductManager {    
    products = [];
    idAuto = 0;    
    
    addProduct (title, description, price, thumbnail, code, stock) {
        let temp = {title, description, price, thumbnail, code, stock};

        if (Object.values(temp).includes(undefined) || Object.values(temp).includes('')) {
            return 'No se agrego el producto por datos incompletos';
        }            
        
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === temp.code) {                
                return 'code esta repetido, producto no agregado';
            };
        }

        this.idAuto = this.idAuto + 1; 
        this.products.push({id: this.idAuto, ...temp})
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

console.log(productoPrueba.getProducts());

productoPrueba.addProduct('producto prueba', 'Este es un producto prueba', 200, 'sin imagen1', '', 25);
productoPrueba.addProduct('producto prueba2', 'Este es un producto prueba2', 400, 'sin imagen2', 'abc122', 50);
productoPrueba.addProduct('producto prueba3', 'Este es un producto prueba3', 600, 'sin imagen3', 'abc123',  75);
productoPrueba.addProduct('producto prueba4', 'Este es un producto prueba4', 800, 'sin imagen4', 'abc124',  100);
productoPrueba.addProduct('producto prueba5', 'Este es un producto prueba5', 1000, 'sin imagen5', 'abc122',  125);
productoPrueba.addProduct('producto prueba6', 'Este es un producto prueba6', 1200, 'sin imagen6', 'abc123',  150);

console.log(productoPrueba.getProducts());

console.log(productoPrueba.getProductById(2));
console.log(productoPrueba.getProductById(51));
