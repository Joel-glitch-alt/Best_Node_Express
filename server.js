const express = require('express');

const studentRoutes = require("./src/routes")
const app = express();

const PORT = process.env.PORT || 2000;


//middle ware..
app.use(express.json())

// GET method route
app.get('/', (req, res) => {
    res.send('Welcome to Home Page')
  });
  

  //
  app.use('/user/student', studentRoutes)


  //PORT
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});