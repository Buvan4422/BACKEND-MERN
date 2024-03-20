//create express app (http server inside)
const express = require('express');
const app = express();
const user = require('./APIs/user-api');
const product = require('./APIs/product-api');

app.listen(4000, () =>
  console.log('Server started and running at http://localhost:4000/')
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to our API' });
});

app.use('/user-api', user);
app.use('/product-api', product);
