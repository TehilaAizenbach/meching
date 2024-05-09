// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const {ClassCtrl}=require('../controllers/classControllers')
const { Schema } = mongoose;

const classSchema = new Schema({
  class_name: String,
  target: Number,
  points: Number
});

// const ClassModel = mongoose.model('classes', classSchema);
router.get('/',ClassCtrl.getClasses);
router.post('/resetPoints',ClassCtrl.resetPoints);
router.post('/resetPointsOfClass',ClassCtrl.resetPointsOfClass)
router.post('/addPoints',ClassCtrl.addPoints)
router.post('/addClass',ClassCtrl.addClass)
router.post('/updateClass',ClassCtrl.updateClass);
router.post('/deleteClass',ClassCtrl.deleteCalss);


module.exports = router;
