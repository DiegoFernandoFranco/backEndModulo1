import fs from 'fs';
import path from 'path';

/* lo uso para que al crear el Products.json lo haga en el mismo directorio
   que el Product Manager, sino lo creaba en donde era llamado,
   por ejemplo lo llamaba desde c:\ y lo creaba ahi, con esto lo sulucione
*/
const managerPath = path.dirname(new URL(import.meta.url).pathname).substring(1);

class ProductManager {
    constructor () {
        this.path = `${managerPath}/products.json`;
        this.products = [];
        this.encodingFile = { encoding: 'utf-8' };
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
            
            return this.products

        }   catch (error) {
                console.log(`El archivo ${this.path} fue Creado.`);
                console.log(`Este mensaje solo saldra una sola vez`);
                await fs.promises.writeFile(this.path, '[]');
                return [];
        }
    };

    async getProductById (id) {
        await this.getProducts();
        const busqueda = await this.products.find((prodBuscado) => prodBuscado.id === id); 

        if (!busqueda) {
            return ({error: 'Not Found'}) ;
            // return ('Not Found') ;
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

        try {            
            if (Object.values(temp).includes(undefined) || Object.values(temp).includes('') || faltanCampos < 6) {
                throw new Error ('No se agrego el producto por datos incompletos')    
            }    
                    
                for (let i = 0; i < this.products.length; i++) {
                    if (this.products[i].code === temp.code) {       
                        throw new Error ('Campo Code Repetido, no se puede agregar el Producto')
                    };
                }
                                
                this.tempProduct.push({id: this.idAuto, ...product})                
                await this.sendToJson()
                throw new Error ('Producto creado Re Exitosamente!!')  
                // return 'Producto creado Re Exitosamente!!';
        }   catch (error) {
                console.log(error.message); // asi es mas limpia la consola al mostrar error.
            }        
    };

    async updateProduct (id, product) {
        await this.getProducts();

        try {      
            const productIndex = this.products.findIndex((item) => item.id === id);   
            const productOld = this.products[productIndex];
            
            const productMod = {id, ...productOld, ...product};
            
            this.products.splice(productIndex, 1, productMod)
      
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
      
          } catch (error) {
            throw new Error(error);
          }
    };

    async deleteProduct (id) {
        this.products = await this.getProducts();
        try {
            if (!this.products.find((product) => product.id === id)) {
                throw new Error (`El Id: ${id} no existe, no se va a eliminar nada`);
            }   else {
                    this.products = this.products.filter((obj) => obj.id !== id);
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
                    return `Producto con Id: ${id} eliminado correctamente`;
            }
        }   catch (error) {
                console.log(error.message)
        }
    };
};

const main = async () => {
    const products = new ProductManager;
    // Ver todos los productos, ahora esta vacio, devuelve [];
    // console.log(await products.getProducts());
    
    // Agregar Productos con id Automatico generado en la clase sin repeticiones
    // await products.addProduct({title: 'Gibson Custom Les Paul', description: 'Electric Guitar', price: 2000, thumbnail: 'Image not available', code: 'abc123', stock: 25});
    // await products.addProduct({title: 'Gibson SG', description: 'Electric Guitar', price: 4000, thumbnail: 'Image not available', code: 'abc124', stock: 50});
    // await products.addProduct({title: 'Gibson Thunderbird', description: 'Electric Guitar', price: 6000, thumbnail: 'Image not available', code: 'abc125', stock: 30});
    // await products.addProduct({title: 'Fender Telecaster', description: 'Electric Guitar', price: 8000, thumbnail: 'Image not available', code: 'abc126', stock: 20});
    // await products.addProduct({title: 'Fender Stratocastor', description: 'Electric Guitar', price: 10000, thumbnail: 'Image not available', code: 'abc127', stock: 35});
    // await products.addProduct({title: 'Gibson Firebird', description: 'Electric Guitar', price: 12000, thumbnail: 'Image not available', code: 'abc128', stock: 25});
    // await products.addProduct({title: 'Gibson Flying V', description: 'Electric Guitar', price: 14000, thumbnail: 'Image not available', code: 'abc129', stock: 45});
    // await products.addProduct({title: 'Gibson Explorer', description: 'Electric Guitar', price: 16000, thumbnail: 'Image not available', code: 'abc130', stock: 40});
    // await products.addProduct({title: 'Fender Standard Jazz', description: 'Electric Bass Guitar', price: 18000, thumbnail: 'Image not available', code: 'abc131', stock: 45});
    // await products.addProduct({title: 'Fender Precision', description: 'Electric Bass Guitar', price: 20000, thumbnail: 'Image not available', code: 'abc132', stock: 65});
    // await products.addProduct({title: 'Music Man Stingray', description: 'Electric Bass Guitar', price: 22000, thumbnail: 'Image not available', code: 'abc133', stock: 55});
    // await products.addProduct({title: 'Rickenbacker 4003 S', description: 'Electric Bass Guitar', price: 24000, thumbnail: 'Image not available', code: 'abc134', stock: 60});
    
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

    // console.log(await products.getProducts());
}

main();

export default ProductManager;