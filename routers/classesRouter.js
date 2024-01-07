// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
  class_name: String,
  target: Number,
  points: Number
});

const ClassModel = mongoose.model('classes', classSchema);
router.get('/', async (req, res) => { 
  try {
   
    const classes = await ClassModel.find();
    const classesData = classes.map(classItem => classItem.toObject());
    res.json(classesData);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
  });

router.post('/resetPoints',async(rea,res)=>{
    try {
      let classes= await ClassModel.find();
      await  classes.forEach(async (classItem) => {
        classItem.points=0;
        let result = await ClassModel.updateOne({ class_name: classItem.class_name }, classItem);
      });
      classes= await ClassModel.find();


      const  classesData =  classes.map( classItem =>  classItem.toObject());
      res.json(classesData).status(200);
    } catch (error) {
      console.error('Error finding classes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  })
router.post('/addPoints',async(req,res)=>{
  const {name,points}=req.body;

  try {
    const classItem = await ClassModel.findOne({ class_name: name });

    if (classItem) {
      classItem.points = classItem.points + points;
      const result = await ClassModel.updateOne({ class_name: name }, classItem);
    }
    res.json("success").status(200);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
})

router.post('/addClass',async(req,res)=>{
  const {classItem}=req.body;
    
})

router.post('./resetPointsOfClass',async(rea,res)=>{
  const {name}=req.body;
  try {
    const classItem = await ClassModel.findOne({ class_name: name });

    if (classItem) {
      classItem.points = 0;
      const result = await ClassModel.updateOne({ class_name: name }, classItem);
    }
    res.json("success").status(200);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
})

module.exports = router;
