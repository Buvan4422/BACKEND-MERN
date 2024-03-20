const express = require('express');
const Productapp = express.Router();

let products = [
  { pId: 101, pName: 'ToothBrush', pBrand: 'Oral-B' },
  { pId: 102, pName: 'Laptop', pBrand: 'hp' },
  { pId: 103, pName: 'MobilePhone', pBrand: 'Samsung' },
  { pId: 104, pName: 'Mouse', pBrand: 'logitech' },
  { pId: 105, pName: 'Laptop', pBrand: 'Dell' },
];

Productapp.use(express.json());

//create middleware
const middleware1 = (req, res, next) => {
  console.log('Middleware -1');
  //res.send({ message: 'MiddleWare-1' });
  next();
};
const middleware2 = (req, res, next) => {
  console.log('Middleware -2');
  //res.send({ message: 'MiddleWare-2' });
  next();
};
const middleware3 = (req, res, next) => {
  console.log('Middleware -3');
  //res.send({ message: 'MiddleWare-3' });
  next();
};

// Productapp.use(middleware3);
// Productapp.use(middleware2);
// Productapp.use(middleware1);

Productapp.get('/', (req, res) => {
  res.redirect('/products');
});

Productapp.get('/products', middleware1, (req, res) => {
  res.send({ message: 'All products', payload: products });
});

Productapp.get('/products/:pName', middleware2, (req, res) => {
  let product = products.filter(
    (product) => product.pName === req.params.pName
  );
  res.send({ message: `Product ${req.params.pName}`, payload: product });
});

Productapp.post('/product', (req, res) => {
  let newProd = req.body;
  products.push(newProd);
  res.send({ message: 'New product added' });
});

Productapp.put('/product', middleware1, middleware3, (req, res) => {
  let uP = req.body;
  let uPid = products.findIndex((ele) => ele.pId === uP.pId);
  products.splice(uPid, 1, uP);
  console.log(products);
  res.send({ message: 'Product updated' });
});

Productapp.delete('/product/:pId', (req, res) => {
  let uPid = Number(req.params.pId);
  let idx = products.findIndex((ele) => ele.pId === uPid);
  products.splice(idx, 1);
  res.send({ message: 'Product deleted' });
});

Productapp.use((err, req, res, next) => {
  res.send({ message: 'error occurred', payload: err.message });
});

module.exports = Productapp;
