const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./model/Users');

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  'mongodb+srv://marrowmichal:MpasswordK@crud.oagln7s.mongodb.net/'
);
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Successfully connected to MongoDB!');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

db.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});

db.on('connecting', () => {
  console.log('Connecting to MongoDB...');
});

app.get('/', (req, res) => {
  UserModel.find({})
  
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post('/createUser', (req, res) => {
  console.log('req.body', req.body);
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  console.log('req', req);
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      date: req.body.date,
      bloodPressure: req.body.bloodPressure,
      heartRate: req.body.heartRate,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log('Server is running.');
});
