const fs = require('node:fs');

class ProductManager {
    static counter = 0;
    products = [];
    path;

    constructor(path) {
        this.path = path;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const id = ProductManager.counter += 1;
        const product = { id, title, description, price, thumbnail, code, stock };
        this.products.push(product);
        return product;
    }

    getProducts() {
        return [...this.products];
    }

    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    updateProduct(id, updates) {
        const product = this.getProductById(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }

        for (const [key, value] of Object.entries(updates)) {
            product[key] = value;
        }

        return product;
    }


    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error(`Product with id ${id} not found`);
        }
        this.products.splice(productIndex, 1);
    }

    writeToFile() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products));
        } catch (error) {
            throw new Error(error)
        }
    }

    readFromFile() {
        try {
            this.products = JSON.parse(fs.readFileSync(this.path));
        } catch (error) {
            throw new Error(error)
        }

    }
}


const productManager = new ProductManager('products.json');

const product1 = productManager.addProduct('Entrada Metallica', 'Entrada para el recital de Metallica', 10, 'imagenRecital1.jpg', 'code1', 10);
const product2 = productManager.addProduct('Entrada Megadeth', 'Entrada para el recital de Megadeth', 20, 'imagenRecital2.jpg', 'code2', 5);
const product3 = productManager.addProduct('Entrada Slayer', 'Entrada para el recital de Slayer', 30, 'imagenRecital3.jpg', 'code3', 2);

console.log(productManager.getProducts());

console.log(productManager.getProductById(1));

productManager.updateProduct(1, { title: 'Nuevo titulo' });
console.log(productManager.getProductById(1));


productManager.deleteProduct(1);
console.log(productManager.getProductById(1));

productManager.writeToFile()
productManager.readFromFile()

module.exports = {
    ProductManager // exporto la clase instanciada y la exporto para tener el servidor en otro modulo
}