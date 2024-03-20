//create express app (http server inside)
const express = require('express');
const app = express();
const user = require('./APIs/user-api');
const product = require('./APIs/product-api');

//connect to Database
const mongoclient = require('mongodb').MongoClient;

mongoclient.connect('mongodb://localhost:27017').then((client) => {
  const dbObj = client.db('532db');
  const userCollection = dbObj.collection('users');
  const prodCollection = dbObj.collection('products');

  app.set('userCollection', userCollection);
  app.set('prodCollection', prodCollection);
  console.log('DB connection successful');
});

app.listen(4000, () =>
  console.log('Server started and running at http://localhost:4000/')
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to our API' });
});

app.use('/user-api', user);
app.use('/product-api', product);
