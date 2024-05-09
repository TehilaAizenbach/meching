const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    code:Number,
    start_Date: String,
    finish_Date: String,
    target: Number,
    points: Number
  });

  exports.ProjectModel = mongoose.model("projects", projectSchema);