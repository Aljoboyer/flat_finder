const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(cors())
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));

// database connetion
const connectDB = require("./src/DBConnection/DBConnection");
connectDB()

const mainRouter = require('./src/modules/routers/index');

// Use the main router
app.use('/api', mainRouter); 

app.get('/', (req, res) => {
  res.send('Flat Finder Server is connected!')
})

app.listen(port, () => {
  console.log(`Flat Finder running on port ${port}`)
})
