import {Router} from 'express';
import CartManager from '../CartManager.js';

const cartRouter = Router();

const carts = new CartManager;

cartRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid)
    const result = await carts.getCartById(cartId);
    if (result) {
        res.status(201).send(result)
    }   else {
        res.status(400).send({status: 'error', error: "Cart no encontrado"})
    }
});

cartRouter.post('/', async (req, res) => {
    const result = await carts.addCart();
    res.status(201).send({status: 'success', message: "New Cart Created"})    
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = +req.params.cid;
    const productId = +req.params.pid;
    const result = await carts.addProductToCart(cartId, productId);
    if (result === true) {
        res.status(201).send({status: 'success', message: `Product ${productId} added to Cart ${cartId}`});
    }   else {
        res.status(400).send({status: 'error', error: result})

    }
})

cartRouter.delete('/:cid', async (req, res) => {
    const result = await carts.deleteCart(+req.params.cid);
    if (result) {
        res.status(201).send({status: 'success', message: `Cart Borrado Exitosamente`});
    }   else {
        res.status(404).send({status: 'error', error: `Cart No Existe`})    }
})

export default cartRouter;