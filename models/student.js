const mongoose = require("mongoose");

let StudentsSchema = new mongoose.Schema({
  id: String,
  first_name:String,
  last_name:String,
  group:String,
  target: Number,
  points: Number
});

exports.StudentsModel = mongoose.model("students", StudentsSchema);