//create a server with help of inbuild node library
const http = require("http");

const { mongoConnect } = require("./services/mongo");

//Get app from the app.js file
const app = require("./app");

//Get the model to load the data
const { loadPlanetsData } = require("../src/models/planets.model");
//Set the port as 8000 if we are not set it at the environment variables
const PORT = process.env.Port || 8000;

// WE need to ask server to wait to listen till the data gets loaded with help of async await we can achiev it
async function startServer() {
  await mongoConnect();
  await loadPlanetsData();
  //lets create a server and take the app as parameter which is middleware for our server
  const server = http.createServer(app);

  //lets listen at the port
  server.listen(PORT, () => {
    console.log(`Nasa-project-Api is listening on port ${PORT}... `);
  });
}

startServer();
