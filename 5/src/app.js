import express from 'express';
import path from 'path';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';

import ProductManager from './ProductManager.js';
const products = new ProductManager;


import productsRouter from './routes/productsRouter.js';
import cartRouter from './routes/cartsRouter.js';
import homeRouter from './routes/homeRouter.js';
import realTimeProductsRouter from './routes/realTimeProductsRouter.js';

const app = express();
const SERVER_PORT = 8080;
const viewsPath = path.resolve('src/views');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/home', homeRouter);
app.use('/realTimeProducts', realTimeProductsRouter);

const httpServer = app.listen(SERVER_PORT, () => console.log(`Server running on Port ${SERVER_PORT}`))
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado', socket.id)    
    // console.log(socket.request.headers['user-agent']);
    socket.on('newProduct', (data) => {
        console.log(data);
    });
    
    socket.on('removeProduct', async (data) => {
        const result = await products.deleteProduct(+data);
        console.log(`Se elimino el producto nro: ${data}`);
        socket.emit('todos', await products.getProducts());
    });
})

// console.log(await products.getProducts());



