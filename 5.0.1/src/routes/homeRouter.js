import {Router} from 'express';
import ProductManager from '../ProductManager.js';

const products = new ProductManager;

const homeRouter = Router();

homeRouter.get('/', async (req, res) => {
    const dataProducts = await products.getProducts();
    res.render('home', {name: 'Diego', dataProducts})
});

export default homeRouter;