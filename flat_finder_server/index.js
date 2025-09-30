const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 5000;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

app.use(cors())
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true }));

// database connetion
const connectDB = require("./src/DBConnection/DBConnection");
connectDB()

const server = http.createServer(app);

// 🔥 Initialize socket
const socket = require("./src/services/socket/socket");
socket.init(server);

const mainRouter = require('./src/modules/routers/index');

// Use the main router
app.use('/api', mainRouter); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.send('Flat Finder Server is connected!')
})

server.listen(port, () => {
  console.log(`Flat Finder running on port ${port}`);
});

module.exports = app;