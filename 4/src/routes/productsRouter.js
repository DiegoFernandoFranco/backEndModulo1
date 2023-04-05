import {Router} from 'express';
import {uploader} from '../utils/multer.js';

import ProductManager from '../ProductManager.js';

const products = new ProductManager;

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const allProducts = await products.getProducts();

    if (req.query.limit) {
        const limite = +req.query.limit;
        res.status(200).send(allProducts.slice(0, limite))
    }   else {
        res.send(allProducts);
    }
});

productsRouter.get ('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const result = await products.getProductById(productId);
    if (result) {
        res.status(200).send(result)
    }   else {
        res.status(404).send({status: 'error', error: 'Not Found'});
        
    }
});

productsRouter.post('/', uploader.single('thumbnail'), async (req, res) => {    
   
    const {title, description, price, code, stock, category} = req.body;
    const newProduct = {title, description, code, price, status: true, stock, category, thumbnail: [req.file.filename]}
    const result = await products.addProduct(newProduct);
    console.log(result)
    if (result !== true) {
        res.status(400).send({status: 'error', error: result});

    }   else {
        res.status(200).send({status: 'success', message: 'Producto Creado Espectacularmente'});
    }
});

productsRouter.put('/:pid', async (req, res) => {
    const idProduct = +req.params.pid;
    const {...product} = req.body;
    const response = await products.updateProduct(idProduct, {...req.body});
    if (response) {
        res.status(201).send({status: 'success', message: 'Producto Actualizado Correctamente'});
    }   else {
        res.status(400).send({status: 'error', error: 'No se pudo modificar el producto'});

    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    const response = await products.deleteProduct(productId)
    if (response) {
        res.status(201).send({status: 'success', message: 'Producto Eliminado Correctamente'});
    }   else {
        res.status(400).send({status: 'error', error: 'Id del Producto no existe'});
    }
})

export default productsRouter;