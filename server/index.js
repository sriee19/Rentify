const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const propertyRoutes = require('./routes/Property');
const userRoutes = require('./routes/User');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection (update with your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/rentify', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
