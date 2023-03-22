const fs = require('fs');

class ProductManager {
    constructor () {
        this.path = './products.json';
        this.products = [];
        this.encodingFile = 'utf-8';
        this.tempWorkProduct = [];
    }
    
    idAuto = 0;
    
    async getFromJson () {
        // this.products = [];
        this.products = await this.getProducts();
        if (this.products.length != 0) {
            this.idAuto = this.products[this.products.length -1]['id'];
        }        
    }
    
    async sendToJson () {
        this.products.push(...this.tempWorkProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    async addProduct (product) {  
        this.tempWorkProduct = [];      
        let temp = {...product};
        this.idAuto = this.idAuto + 1; 
        const faltanCampos = Object.keys(product).length

        try {            
            if (Object.values(temp).includes(undefined) || Object.values(temp).includes('') || faltanCampos < 6) {
                throw new Error ('No se agrego el producto por datos incompletos')    
            }    
                    
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i].code === temp.code) {       
                        throw new Error ('Campo Code Repetido, no se puede agregar el Producto')
                    };
                }
                                
                this.tempWorkProduct.push({id: this.idAuto, ...product})
                this.sendToJson();
                return;
            }   catch (error) {
                    console.log(error.message); // asi es mas limpia la consola al mostrar error.
                    // console.log(error);
                }
    };

    async getProducts () {
        try {
            const tempGet = await fs.promises.readFile(this.path, { encoding: 'utf-8' });            
            return JSON.parse(tempGet);

        }   catch (error){
            // console.log(error.message);
            console.log(`El archivo ${this.path} fue Creado.`);
            console.log(`Este mensaje solo saldra una sola vez`);
            await fs.promises.writeFile(this.path, '[]');
            return [];
        }
    }

    async getProductById (id) {
        const busqueda = await this.products.find((prodBuscado) => prodBuscado.id === id); 

        if (!busqueda) {
            return('Not Found') 
        }   else {
            return busqueda;
        };
    }

    async updateProduct (id, product) {
        try {      
            const productIndex = this.products.findIndex((item) => item.id === id);   
            const productOld = this.products[productIndex];
            
            const productMod = {id, ...productOld, ...product};
            
            this.products.splice(productIndex, 1, productMod)
      
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
      
          } catch (error) {
            throw new Error(error);
          }
    }
    
    async deleteProduct (id) {
        try {
            this.products = this.products.filter((obj) => obj.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        }   catch {

        }

    }
}

const main = async () => {
    // nueva instancia de PM;
    const products = new ProductManager;
    await products.getFromJson(); // esta llamada carga los productos del json si ya existe, asi no crea el archivo 
    // Ver todos los productos, ahora esta vacio, devuelve [];
    // console.log(await products.getProducts());
    
    // Agregar Productos con id Automatico generado en la clase sin repeticiones
    // await products.addProduct({title: 'Gibson Custom Les Paul', description: 'Electric Guitar', price: 2000, thumbnail: 'Image not available', code: 'abc123', stock: 25});
    // await products.addProduct({title: 'Gibson SG', description: 'Electric Guitar', price: 4000, thumbnail: 'Image not available', code: 'abc124', stock: 50});
    // await products.addProduct({title: 'Gibson Thunderbird', description: 'Electric Guitar', price: 6000, thumbnail: 'Image not available', code: 'abc125', stock: 25});
    // await products.addProduct({title: 'Fender Telecaster', description: 'Electric Guitar', price: 8000, thumbnail: 'Image not available', code: 'abc126', stock: 25});
    // await products.addProduct({title: 'Fender Stratocastor', description: 'Electric Guitar', price: 10000, thumbnail: 'Image not available', code: 'abc127', stock: 50});
    // await products.addProduct({title: 'Gibson Firebird', description: 'Electric Guitar', price: 12000, thumbnail: 'Image not available', code: 'abc128', stock: 50});
    
    // Ver todos los productos, ahora hay productos, devuelve array de objetos;
    // console.log(await products.getProducts());

    // Muestra producto por Id
    // console.log(await products.getProductById(4));

    // Modificacion de producto con mismo Id y en la misma posición, es un bajo, no guitarra
    // await products.updateProduct(3, {description: 'Electric Bass'})
    // Modificacion de producto con mismo Id y en la misma posición, titulo mal escrito, es Stratocaster, no Stratocastor 
    // await products.updateProduct(5, {title: 'Fender Stratocaster'})

    // Eliminacion de producto por id, no existe ese id, tira error
    // await products.deleteProduct(100)
    // Eliminacion de producto por id, no existe mas ese numero de id
    // await products.deleteProduct(2) // Chau Angus Young Guitar

    // Productos con code repetido, no se agregan
    // await products.addProduct({title: 'Gibson Thunderbird', description: 'Electric Bass', price: 6000, thumbnail: 'Image not available', code: 'abc125', stock: 25});
    // await products.addProduct({title: 'Gibson Firebird', description: 'Electric Guitar', price: 12000, thumbnail: 'Image not available', code: 'abc128', stock: 50});
    
    // Productos sin un campo Valido, no se agregan
    // await products.addProduct({title: 'Gibson Custom Les Paul', description: 'Electric Guitar', code: 'abc200', stock: 25});
    // await products.addProduct({title: 'Gibson SG', description: 'Electric Guitar', price: '', thumbnail: 'Image not available', code: 'abc124', stock: 50});
}

main();