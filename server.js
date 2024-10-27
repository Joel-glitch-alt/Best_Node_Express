const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors'); 
const morgan = require('morgan'); 

const studentRoutes = require("./src/routes");
const authRoutes = require('./src/auth_route');
const protectedRoutes = require('./src/protected_routes');

const PORT = process.env.PORT || 2000;

// CORS options
const corsOptions = {
  origin: 'http://example.com', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions)); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use(cookieParser());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Home Page');
});

// Define routes
app.use('/user/student', studentRoutes);
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
