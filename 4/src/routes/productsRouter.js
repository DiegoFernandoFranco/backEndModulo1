import {Router} from 'express';
import {uploader} from '../utils/multer.js';

import ProductManager from '../ProductManager.js';

const products = new ProductManager;

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    const allProducts = await products.getProducts();

    if (req.query.limit) {
        const limite = +req.query.limit;
        res.send(allProducts.slice(0, limite));
    }   else {
            res.send(allProducts);
    }
});

productsRouter.get ('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    res.send(await products.getProductById(productId));
});

productsRouter.post('/', uploader.single('thumbnail'), async (req, res) => {    
    if (!req.file) {
        res.status(400).send({status: 'error', error: 'Imagen no guardada'});
    }
    res.send({status: 'success', message: 'Imagen guardada'});
    

    const {title, description, price, code, stock, category} = req.body;
    const newProduct = {title, description, code, price, status: true, stock, category, thumbnail: [req.file.filename]}
    res.send(await products.addProduct(newProduct));
});

productsRouter.put('/:pid', async (req, res) => {
    const idProduct = req.params.pid;
    const {...product} = req.body;
    res.send(await products.updateProduct(idProduct, {...req.body}));
})

productsRouter.delete('/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    res.send(await products.deleteProduct(productId));
})

export default productsRouter;