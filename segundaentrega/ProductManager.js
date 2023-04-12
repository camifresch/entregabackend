const fs = require('fs');

class Product {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price,
        this.thumbnail = product.thumbnail;
        this.code = product.code;
        this.stock= product.stock;
        this.id = product.id;
    }
}

class ProductManager {
    constructor (ARCHIVO) {
        this.path = ARCHIVO;
        this.products = [];
    }


    addProduct = async (product) => {
        if (this.validProduct(product)) {
            this.products.push(new Product({
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock,
                id: this.generateId()
            }));
            
        } else {
            console.error("El producto ingresado no es valido")
        }

        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    }

    generateId() {
        return this.products.length + 1;
    }

    validProduct(product) {
        return (
        !this.products.find((pr) => product.id == pr.id) && 
        product.title && 
        product.description && 
        product.price && 
        product.thumbnail && 
        product.stock
        );
    }

    getProducts = async () => {
        const productList = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(productList)
    }

    getProductById = async (productId) => {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const parsedProducts = JSON.parse(products);
        const product = parsedProducts.find((p) => p.id === parseInt(productId))
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        return product;
    };

    updateProduct = async(productId, fieldToUpdate, newValue) => {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const transfProd = JSON.parse(products); 
        const index = transfProd.findIndex((product) => product.id === productId);
        
        transfProd[index][fieldToUpdate] = newValue; 
        
        await fs.promises.writeFile(this.path, JSON.stringify(transfProd));
    }

    deleteProductById = async (productId) => {
        const products = await fs.promises.readFile(this.path, 'utf-8');
        const parsedProducts = JSON.parse(products);
        const updatedProducts = parsedProducts.filter(
            (p) => p.id !== parseInt(productId)
        );
        this.products = updatedProducts; // update this.products array
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts));
        return updatedProducts;
    };
}
let productManager = new ProductManager('./productos.json');

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager.addProduct({
    title: 'producto prueba 2',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager.addProduct({
    title: 'producto prueba 3',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager.addProduct({
    title: 'producto prueba 4',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager.addProduct({
    title: 'producto prueba 5',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager.addProduct({
    title: 'producto prueba 6',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
});

productManager
.getProducts()
.then((products) => {
    console.log('productos: ', products);
    console.log('termina buscando productos');
})
    .catch((err) => console.log('error buscando productos'));

productManager.getProductById(1).then(product => {
    console.log("producto by id 1: ", product);
}).catch(err => console.log("error buscando producto by id"));

productManager
.getProductById(1)
.then((product) => {
        console.log('producto by id 1: ', product);
}).catch((err) => console.log('error buscando producto by id'));

productManager
.deleteProductById(1)
.then((updatedProducts) => {
    console.log(`producto(s) borrado(s): ${JSON.stringify(updatedProducts)}`);
})
.catch((err) => console.log('error borrando producto by id'));

productManager
.getProducts()
.then((products) => {
    console.log('productos: ', products);
    // console.log('termina buscando productos');
})
.catch((err) => console.log('error buscando productos'));

