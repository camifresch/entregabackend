const fs = require('fs');

class ProductManager {
    constructor () {
        this.products = [];
        this.latestId = 1;
        this.path = './listadoDeProductos.JSON';
    }


    addProduct (title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: todos los campos son obligatorios");
            return; 
        }

        const found = this.products.some(product => product.code === code);

        if (found) {
        
        console.log(`Error: Ya existe un producto con el código ${code}`);
        
        return;
        
        }

    const newproduct = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        id: ++ this.latestId //arreglado el problema del id que debe de ser único y buscar por ID
    }

    this.products.push (newproduct);
    console.log("Producto agregado con éxito");
        fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
            if (err) throw err;
            console.log('Archivo guardado con éxito');
        });
        
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async getProductById(productId) {
        const data = await fs.promises.readFile(this.path, 'utf-8'); 
        const productsById = JSON.parse(data);
        const product = productsById.find(product => product.id === productId);
        if (product) {
            console.log(product);
            return product; // Return the product object, not just the ID
        } else {
            console.log("Error: producto no encontrado");
        }
    } 

    async updateProduct (productId, field, updateData) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);
        
        const index = products.findIndex(product => product.id === productId);
        if (index === -1) {
            console.log('Error: producto no encontrado');
            return;
        }
        products[index][field] = updateData;

        fs.writeFile(this.path, JSON.stringify(products), err => {
            if (err) throw err;
            console.log('Producto actualizado con éxito desde updateProduct')
        });
    }

    async deleteProduct (deleteById){
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const products = JSON.parse(data);

        const deleteItemFilter = products.filter(product => product.id !== deleteById);

        if (deleteItemFilter.length === products.length) {
            console.log('Error: No se encontró producto con ID ${deleteById}');
            return;
        }

        fs.writeFile(this.path, JSON.stringify(deleteItemFilter), err => {
            if (err) throw err;
            console.log('Producto borrado con éxito desde deleteProduct');
        });
        
    }


}

//ejemplos de uso
const manager = new ProductManager();
manager.addProduct("Camiseta", "camiseta de algodón", 1500, "imagen1.jpg", "CAM01", 1);
manager.addProduct("Pantalon", "Pantalon de seda", 3500, "imagen2.jpg", "PAN01", 1);
manager.addProduct("Zapatillas", "Zapatilla negra", 35000, "imagen3.jpg", "ZAP01", 1);
console.log(manager.getProducts());
manager.getProductById(4);
console.log(manager.getProductById(2).description);
console.log(manager.getProducts);
manager.updateProduct(4,'description', 'Zapatilla amarilla');
manager.deleteProduct(2);


module.exports = {ProductManager};