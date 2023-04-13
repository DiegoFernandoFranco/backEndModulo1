import fs from 'fs';
import path from 'path';
import ProductManager from './ProductManager.js';

class CartManager {
    constructor () {
        const cartPath = path.resolve('src/db');
        this.path = cartPath + '/' + 'carts.json';
        this.encodingFile = { encoding: 'utf-8' };
        this.idAuto = 0;
        this.carts = [];
    }

    async checkManagerExists () {
        try {
            const comprobacion = await fs.promises.readFile(this.path, this.encodingFile);
            // return this.carts;
            return;
        }   catch (error) {
                console.log(`El archivo del Cart ${this.path} fue Creado.`);
                console.log(`Este mensaje solo saldra una sola vez`);
                console.log(this.path)
                await fs.promises.writeFile(this.path, '[]');
        }
    };    

    async getCarts () {
        try {
            const temp = await fs.promises.readFile(this.path, this.encodingFile);
            this.carts = JSON.parse(temp);
    
            if (this.carts.lenght != 0) {
                this.idAuto = this.carts[this.carts.length -1]['id'];
            }
            return this.carts;

        }   catch (error) {
                return [];
        }

    };

    async getCartById (id) { // POST
        await this.getCarts();
        const busqueda = await this.carts.find((cartBuscado) => cartBuscado.id === id); 

        if (!busqueda) {
            return ({error: 'Not Found'}) ;
            // return ('Not Found') ;
        }   else {
            return busqueda;
        };
    }

    async addCart () {
        await this.checkManagerExists();  
        await this.getCarts();

        this.idAuto = this.idAuto + 1;
        this.carts.push({'id': this.idAuto, 'products': []});
        const enviar = JSON.stringify(this.carts, null, 2);        
        await fs.promises.writeFile(this.path, enviar)
    };

    async addProductToCart (idCart, idProduct) {
        // comprueba si existe idCart
        const cartOld = await this.getCarts();
        const cartIndex = cartOld.findIndex((cart) => cart.id === idCart);
        if (cartIndex === -1) {
            console.log('No Existe Cart Id en Carts')
            return 'No Existe Cart Id en Carts';
        };        
        // return 'Existe Cart Id in Carts';
        console.log('Existe Cart Id in Carts')

        // comprueba si existe idProduct
        const products = new ProductManager;
        const product = await products.getProductById (idProduct)
        // console.log(product)
        if (!product) {
            console.log('No Existe Product id in Products')
            return 'No Existe Product id in Products';
        };
        console.log('Existe Product id in Products')

        // comprueba si existe idProduct en Cart
        const productInCart = cartOld[cartIndex].products.findIndex((id) => id.id == idProduct)
        if (productInCart !== -1) {
            console.log('esta, add quantityr')
            cartOld[cartIndex].products[productInCart].quantity++;           
        }   else {
            cartOld[cartIndex].products.push({"id": idProduct, "quantity": 1})
            console.log('no esta, agregar')
        };

        const enviar = JSON.stringify(cartOld, null, 2);
        console.log('no tendria que llegar aca si no existe producto')
        await fs.promises.writeFile(this.path, enviar, 'utf-8')
        return true;
    };

    async deleteCart (id) {
        await this.getCarts();
        try {
            if (!this.carts.find((cart) => cart.id === id)) {
                throw new Error (`El Id: ${id} no existe, no se va a eliminar nada`);
                return false;
            }   else {
                    this.carts = this.carts.filter((obj) => obj.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));

                    return true;
            }
        }   catch (error) {
                console.log(error.message)
        }
    };
};

export default CartManager;