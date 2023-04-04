import {Router} from 'express';
import CartManager from '../CartManager.js';

const cartRouter = Router();

const carts = new CartManager;

cartRouter.get('/:cid', async (req, res) => {
    const cartId = parseInt(req.params.cid)
    res.send(await carts.getCartById(cartId));
});

cartRouter.post('/', async (req, res) => {
    // res.send(await carts.addCart())
    const result = await carts.addCart();
    res.status(201).send({status: 'success', message: "New Cart Created"})    
});

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    const cartId = +req.params.cid;
    const productId = +req.params.pid;
    res.send(await carts.addProductToCart(cartId, productId))
})

cartRouter.delete('/:cid', async (req, res) => {
    res.send(await carts.deleteCart(+req.params.cid));
})

export default cartRouter;