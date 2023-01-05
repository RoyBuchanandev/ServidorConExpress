const express = require('express');
const {ProductManager} = require('./manejoDeArchivos');

const app = express();
const port = 3002;


const productManager = new ProductManager('products.json');


productManager.addProduct('Pelicula 1', 'Scarface', 1000, 'scarface.jpg', 'code1', 10);
productManager.addProduct('Pelicula 2', '2001 Odisea en el espacio', 1200, '2001 Odisea en el espacio.jpg', 'code2', 5);
productManager.addProduct('Pelicula 3', 'Jurassic Park', 1500, '2001 Odisea en el espacio.jpg', 'code3', 0);


productManager.writeToFile().then(() => {
  console.log('Productos escritos al archivo');
}).catch(error => {
  console.error(error);
});

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  productManager.readFromFile().then(() => {
    let products = productManager.getProducts();
    if (limit) {
      products = products.slice(0, limit);
    }
    res.send(products);
  }).catch(error => {
    console.error(error);
  });
});

app.get('/products/:pid', (req, res) => {
  const pid = req.params.pid;
  productManager
    .readFromFile()
    .then(() => {
      const product = productManager.getProductById(pid);
      if (product) {
        res.send(product);
      } else {
       console.log('no se encontro el producto');
      }
    })
    .catch(error => {
      console.error(error);
      console.log('no se pudieron leer los productos')
    });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
