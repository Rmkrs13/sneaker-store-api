const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

// Load environment variables
require('dotenv').config();

// App setup
const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const mongoURI = config.get('mongoURI');
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/orders', require('./routes/api/v1/orders'));

// Start server
const PORT = config.get('port');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));