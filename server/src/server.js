//create a server with help of inbuild node library
const http = require("http");
//get the mongoose to connect the mongo DB
const mongoose = require("mongoose");

//Get app from the app.js file
const app = require("./app");

//set the connection string
const MONGO_URL =
  "mongodb+srv://nasa-api:7jGgN2jT9BkkzMSs@nasacluster.kx88kjs.mongodb.net/nasa?retryWrites=true&w=majority";

//Event emitter written to find out the mongoo Db connection, we need to connect only once
mongoose.connection.once("open", () => {
  console.log("Succefully Mongo DB Connected. . . ");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongo Db connection error ${err}`);
});
//Get the model to load the data
const { loadPlanetsData } = require("../src/models/planets.model");
//Set the port as 8000 if we are not set it at the environment variables
const PORT = process.env.Port || 8000;

// WE need to ask server to wait to listen till the data gets loaded with help of async await we can achiev it
async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  //lets create a server and take the app as parameter which is middleware for our server
  const server = http.createServer(app);

  //lets listen at the port
  server.listen(PORT, () => {
    console.log(`Nasa-project-Api is listening on port ${PORT}... `);
  });
}

startServer();
