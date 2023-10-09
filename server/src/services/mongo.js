//get the mongoose to connect the mongo DB
const mongoose = require("mongoose");

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

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function disConnectMongo() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, disConnectMongo };
