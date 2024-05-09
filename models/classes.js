const mongoose = require("mongoose");

let classSchema = new mongoose.Schema({
  class_name: String,
  target: Number,
  points: Number
});

exports.ClassModel = mongoose.model("classes", classSchema);