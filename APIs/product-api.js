const express = require('express');
const Productapp = express.Router();

let prodCollection;
Productapp.use((req, res, next) => {
  prodCollection = req.app.get('prodCollection');
  next();
});
Productapp.use(express.json());

Productapp.get('/', (req, res) => {
  res.redirect('/products');
});

Productapp.get('/products', async (req, res) => {
  let proList = await prodCollection.find().toArray();

  res.send({ message: 'your data', payload: proList });
});

Productapp.get('/products/:prodName', async (req, res) => {
  let name = req.params.prodName;
  let ans = await prodCollection.findOne(
    {
      pName: name,
    },
    { returnDocument: 'after' }
  );
  res.send({ message: `Product ${req.params.prodName}`, payload: ans });
});

Productapp.post('/product', async (req, res) => {
  let newProd = req.body;
  await prodCollection.insertOne(newProd);
  res.send({ message: 'New product added' });
});

Productapp.put('/product', async (req, res) => {
  let modifiedProd = req.body;
  await prodCollection.findOneAndUpdate(
    { prodId: modifiedProd.prodId },
    { $set: { ...modifiedProd } },
    { returnDocument: 'after' }
  );
  res.send('Prod modified');
});

Productapp.delete('/product/:prodId', async (req, res) => {
  let id = Number(req.params.prodId);
  //delete user from DB
  await prodCollection.deleteOne({ prodId: id });
  res.send({ message: 'User deleted' });
});

// Productapp.use((err, req, res, next) => {
//   res.send({ message: 'error occurred', payload: err.message });
// });

module.exports = Productapp;
