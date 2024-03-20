//create express Userapp(mini route)
const express = require('express');
const Userapp = express.Router();
Userapp.use(express.json());

//create API(routes)

//route to read users
Userapp.get('/', (req, res) => {
  res.redirect('/users');
});

Userapp.get('/users', async (req, res) => {
  const userCollection = req.app.get('userCollection');

  let usersList = await userCollection.find().toArray();

  res.send({ message: 'your data', payload: usersList });
});

Userapp.post('/user', async (req, res) => {
  const userCollection = req.app.get('userCollection');
  let newUser = req.body;

  await userCollection.insertOne(newUser);
  res.send({ message: 'New user  created' });
});

Userapp.put('/user', (req, res) => {
  let uUp = req.body;
  let uid = users.findIndex((ele) => ele.id === uUp.id);
  users.splice(uid, 1, uUp);
  console.log(users);
  res.send({ message: 'User updated' });
});

Userapp.delete('/user/:id', (req, res) => {
  let uid = Number(req.params.id);
  let idx = users.findIndex((ele) => ele.id === uid);
  users.splice(idx, 1);
  res.send({ message: 'User deleted' });
});

module.exports = Userapp;
