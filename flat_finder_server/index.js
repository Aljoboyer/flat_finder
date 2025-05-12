const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors())
app.use(fileUpload());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// database connetion
const connectDB = require("./src/DBConnection/DBConnection");
connectDB()

app.get('/', (req, res) => {
  res.send('Flat Finder Server is connected!')
})

app.listen(port, () => {
  console.log(`Flat Finder running on port ${port}`)
})
