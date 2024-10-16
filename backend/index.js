const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors()); 

// Import routes
const sportsRoute = require('./routes/sportsRoute');
const viewRoute = require('./routes/viewRoute');
const bookingRoute = require('./routes/bookingroute');
const centerRoute = require('./routes/centerRoute');
const authRoute = require('./routes/authRoute');

// Use the route
app.use('/api/sports', sportsRoute);
app.use('/api/view', viewRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/center', centerRoute);
app.use('/api/login', authRoute);


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Listen on the defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

