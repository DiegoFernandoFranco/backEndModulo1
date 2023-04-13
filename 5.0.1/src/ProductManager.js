import fs from 'fs';
import path from 'path';

class ProductManager {
    constructor () {
        const managerPath = path.resolve('src/db');
        this.path = managerPath + '/' + 'products.json';
        this.encodingFile = { encoding: 'utf-8' };
        this.products = [];
        this.tempProduct = [];
        this.idAuto = 0;
    }
    
    async sendToJson () {
        this.products.push(...this.tempProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }

    async getProducts () {
        try {
            const temp = await fs.promises.readFile(this.path, this.encodingFile);
            this.products = JSON.parse(temp);
            
            if (this.products.length != 0) {
                this.idAuto = this.products[this.products.length -1]['id'];
            } 
            
            return this.products;

        }   catch (error) {
            console.log(`El archivo ${this.path} fue Creado.`);
            console.log(`Este mensaje solo saldra una sola vez`);
            console.log(this.path)
            await fs.promises.writeFile(this.path, '[]');
            return [];
        }
    };

    async getProductById (id) {
        await this.getProducts();
        const busqueda = await this.products.find((prodBuscado) => prodBuscado.id === id); 

        if (!busqueda) {
            return false;            
        }   else {
            return busqueda;
        };
    }

    async addProduct (product)  {
        await this.getProducts();
        this.tempProduct = [];
        let temp = {...product};
        this.idAuto = this.idAuto + 1;
        const faltanCampos = Object.keys(product).length

        
        if (Object.values(temp).includes(undefined) || Object.values(temp).includes('') || faltanCampos < 8) { //verifica 8 campos obligarios, buscar otra forma
            return 'No se agrego el producto por datos incompletos'
        }    
                    
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].code === temp.code) {       
                return 'Campo Code Repetido, no se puede agregar el Producto'
            };
        }
                                
        this.tempProduct.push({id: this.idAuto, ...product})                
        await this.sendToJson()
        return true;          
    };

    async updateProduct (id, product) {
        await this.getProducts();

        try {      
            const productIndex = this.products.findIndex((item) => item.id === id);   
            const productOld = this.products[productIndex];
            
            const productMod = {id, ...productOld, ...product};
            
            this.products.splice(productIndex, 1, productMod)
      
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            return true;
      
          } catch (error) {
            return false;
          }
    };

    async deleteProduct (id) {
        this.products = await this.getProducts();
       
        if (!this.products.find((product) => product.id === id)) {
            return false;
        }   else {
            this.products = this.products.filter((obj) => obj.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
            return true;
        }        
    };
};

export default ProductManager;