const mongoose = require("mongoose");

//Defino el profesor
const professorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cedula: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Professor", professorSchema);