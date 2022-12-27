const express = require('express');
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('products.json');
const app = express();

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();
  if (limit) {
    products = products.slice(0, limit);
  }
  res.send({ products });
});

app.get('/products/:pid', (req, res) => {
  const pid = req.params.pid;
  const product = productManager.getProductById(pid);
  if (!product) {
    console.log('no se encontro el producto');
  } else {
    res.send({ product });
  }
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
  });
