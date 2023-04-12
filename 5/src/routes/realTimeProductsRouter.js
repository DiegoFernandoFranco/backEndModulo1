import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const products = new ProductManager;

const realTimeProductsRouter = Router();

realTimeProductsRouter.get('/', async (req, res) => {
    const dataProducts = await products.getProducts();
   
    res.render('realTimeProducts', {name: 'Diego', dataProducts})
});

export default realTimeProductsRouter;