// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// server.js
const mongoose = require('mongoose');

// Add this line to suppress the warning
mongoose.set('strictQuery', true);

// Your existing MongoDB connection code
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/geolocationDB';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});


// Define schema and model
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

// API route to save location
app.post('/save-location', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const newLocation = new Location({ latitude, longitude });
    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save location', error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
