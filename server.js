const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan'); 

const studentRoutes = require("./src/routes");
const app = express();

const PORT = process.env.PORT || 2000;

// CORS options
const corsOptions = {
  origin: 'http://example.com', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Middleware
app.use(cors(corsOptions)); 
app.use(morgan('dev')); 
app.use(express.json()); 

// GET method route
app.get('/', (req, res) => {
  res.send('Welcome to Home Page');
});

// Define routes
app.use('/user/student', studentRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
