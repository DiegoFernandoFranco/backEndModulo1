import express from 'express';
import ProductManager from './ProductManager.js';

const app = express ();
app.use(express.urlencoded({extended: true}));

const products = new ProductManager;

// Instrucciones de uso de la Api Franco - Innecesario totalmente
app.get(['', '/'], (req, res) => {
    
    res.send(`/products para ver todos los productos\n/products/id para buscar producto por id\n/products?limit=(cantidad) para que muestre cuantos productos a mostrar`)
});
// Fin Instrucciones de uso de la Api Franco - Innecesario totalmente!!

app.get('/products', async (req, res) => {
    const allProducts = await products.getProducts();

    if (req.query.limit) {
        const limite = +req.query.limit;
        res.send(allProducts.slice(0, limite));
    }   else {
            res.send(allProducts);
    }
});

app.get ('/products/:pid', async (req, res) => {
    const productId = parseInt(req.params.pid);
    res.send(await products.getProductById(productId));
});

app.listen(8080, () => {
    console.log('Server running on port 8080')
});