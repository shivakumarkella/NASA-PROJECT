const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

//setting up the models and scheema
module.exports = mongoose.model("Planet", planetsSchema);
