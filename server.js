require('dotenv').config();
require('./config/database');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const favicon = require('serve-favicon');
const logger = require('morgan');
const PORT = process.env.PORT || 3001; 
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error(err));

// Middleware
app.use(express.json()); 
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/checkToken'));

// Routes
app.use('/api/users', require('./routes/api/users'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


