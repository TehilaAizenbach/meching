// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
// const ClassModel=require('../models/classes')
const mongoose = require('mongoose');
const { Schema } = mongoose;
// Configure MySQL connection
// const pool = mysql.createPool({
//   host: 'sql101.infinityfree.com',
//   user: 'if0_35720848',
//   password: 'ywNnU4AnxhegHhO',
//   database: 'if0_35720848_kiryatata',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

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
 
router.post('/addPoints',async(req,res)=>{
  const {name,points}=req.body;

  try {
    const classItem = await ClassModel.findOne({ class_name: name });

    if (classItem) {
      classItem.points = classItem.points + points;
      const result = await ClassModel.updateOne({ class_name: name }, classItem);
      console.log("");
    }
    res.json("success").status(200);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
//   const [existingClasses] = await pool.query(`SELECT * FROM classes WHERE class_name ='${name}'`, [name]);
//  try {
//   if (existingClasses.length === 0) {
//     return res.status(404).json({ error: 'Student not found' });
//   }
//   await pool.query(`UPDATE classes SET points = ${existingClasses[0].points + points}  WHERE class_name = '${name}'`,[name]);
//  } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'Internal Server Error' });

//  }
})
module.exports = router;

// ClassModel.find()
   
  //   try {
  //     const [rows] = await pool.query('SELECT * FROM classes');;
  //     res.status(200).json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }