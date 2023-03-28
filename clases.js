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
    constructor() {
        this.products = [];
    }


    addProduct(product) {
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
    }

    generateId() {
        return this.products.length + 1;
    }

    validProduct(product) {
        return !this.products.find(pr => product.code == pr.code) && product.title && product.description && product.price && product.thumbnail && product.stock
    }

    getProducts() {
        return this.products
    }

    getProductById(id){
        return this.products.find((product) => {
                if(product.id === id){
                    return product
                } else {
                    console.error('id no encontrado', id);
                }
        })
    }
}

let productManager = new ProductManager()

let allProducts = productManager.getProducts()
console.log(allProducts)

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
})


allProducts = productManager.getProducts()
console.log(allProducts)

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
})

console.log(productManager.getProducts())

productManager.addProduct({
    title: 'producto prueba',
    description:'Este es un producto prueba',
    price:'200',
    thumbnail:'Sin imagen',
    code:'acv321',
    stock:25
})

console.log("Buscando producto con id 1: ", productManager.getProductById(1))
productManager.getProductById(40)
