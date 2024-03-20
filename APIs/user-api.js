//create express Userapp(mini route)
const express = require('express');
const Userapp = express.Router();

//assign port number

Userapp.use(express.json());
let users = [
  { id: 200, name: 'Buvan' },
  { id: 201, name: 'John Doe' },
];

Userapp.get('/', (req, res) => {
  res.redirect('/users');
});

Userapp.get('/users', (req, res) => {
  res.send({ message: 'All users', payload: users });
});

Userapp.post('/user', (req, res) => {
  let newUser = req.body;
  users.push(newUser);
  res.send({ message: 'New user  created', payload: newUser });
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
