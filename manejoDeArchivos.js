const fs = require('fs');

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
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(this.products), error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  readFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (error, data) => {
        if (error) {
          reject(error);
        } else {
          this.products = JSON.parse(data);
          resolve();
        }
      });
    });
  }
}

module.exports = {ProductManager};
