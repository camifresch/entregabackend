const express = require('express');
const {ProductManager} = require('./components/ProductManager');

const PUERTO = 8030;

const server = express();

server.use(express.urlencoded({extended: true}));

//creo el productManager
const manager = new ProductManager();
const getProducts = manager.getProducts();

server.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit);
if(!limit) return res.send(await getProducts);

    let allProducts = await getProducts;
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
});

server.get('/products/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await getProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById);
});

server.listen(PUERTO, () => {
    console.log(`Servidor express activo en puerto ${PUERTO}`);
});

server.on('error', (error) => console.log(`Error en el servidor ${error}`));