const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./model/Users');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('YOUR_GOOGLE_CLIENT_ID');

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
app.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: 'YOUR_GOOGLE_CLIENT_ID',
    });
    const payload = ticket.getPayload();
    console.log('Google user payload:', payload);

    const { sub, email, name } = payload;

    // Check if user already exists
    let user = await UserModel.findOne({ googleId: sub });
    if (!user) {
      user = await UserModel.create({
        googleId: sub,
        email,
        name,
      });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

app.listen(3001, () => {
  console.log('Server is running.');
});
