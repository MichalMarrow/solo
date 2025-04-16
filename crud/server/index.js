const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./model/Users');
const VitalModel = require('./model/Vitals');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(
  '727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com'
);

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(
  'mongodb+srv://marrowmichal:MpasswordK@crud.oagln7s.mongodb.net/crud'
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

app.post('/AddVitals', async (req, res) => {
  const { date, bloodPressure, heartRate, userId } = req.body;
  console.log('userId', userId);
  try {
    const newVital = new VitalModel({
      // Get the userId from the authenticated request object = Associate the vital with the user's ID
      date: new Date(date), // Assuming date is sent as a string, convert to Date object
      bloodPressure,
      heartRate,
      userId: userId,
    });

    const savedVital = await newVital.save();
    res.json(savedVital);
    // Respond with the newly created vital data
  } catch (error) {
    console.error('Error adding vital:', error);
    res.status(500).json({ message: 'Failed to add vital' });
  }
});

app.put('/UpdateVitals/:id', (req, res) => {
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

//this is referenced in Vital
app.get('/vitals/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const vitals = await VitalModel.find({ userId: userId });
    res.json(vitals);
  } catch (error) {
    console.error('Error fetching vitals:', error);
    res.status(500).json({ message: 'Failed to fetch vitals' });
  }
});

app.delete('/deleteVital/:id', (req, res) => {
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
      audience:
        '727214915174-f8gb1jlgfhsk5j349sv384lt4al8qp14.apps.googleusercontent.com',
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
