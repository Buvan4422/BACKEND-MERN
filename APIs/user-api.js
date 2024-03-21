//create express Userapp(mini route)
const express = require('express');
const Userapp = express.Router();
Userapp.use(express.json());

//create API(routes)
let userCollection;
Userapp.use((req, res, next) => {
  userCollection = req.app.get('userCollection');
  next();
});

//route to read users
Userapp.get('/', (req, res) => {
  res.redirect('/users');
});

Userapp.get('/users', async (req, res) => {
  let usersList = await userCollection.find().toArray();

  res.send({ message: 'your data', payload: usersList });
});

Userapp.post('/user', async (req, res) => {
  //const userCollection = req.app.get('userCollection');
  let newUser = req.body;

  await userCollection.insertOne(newUser);
  res.send({ message: 'New user  created' });
});

Userapp.put('/user', async (req, res) => {
  //const usersCollection = req.app.get('userCollection');

  let modifiedUser = req.body;
  await userCollection.findOneAndUpdate(
    { userId: modifiedUser.userId },
    { $set: { ...modifiedUser } },
    { returnDocument: 'after' }
  );
  res.send('User modified');
});

Userapp.delete('/user/:userId', async (req, res) => {
  //get userCollection obj
  //const usersCollection = req.app.get('userCollection');
  //get id from params
  let id = Number(req.params.userId);
  //delete user from DB
  await userCollection.deleteOne({ userId: id });
  res.send({ message: 'User deleted' });
});
module.exports = Userapp;
