// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bookRoutes = require('./routers/books');
const userRouter= require('./routers/userController')
const cookieParser = require('cookie-parser');
dotenv.config({path:"./config/config.env"});


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookdb';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

// Use routes
app.use(cookieParser());
app.use('/books', bookRoutes);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
