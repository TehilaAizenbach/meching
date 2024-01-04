// routes/studentRoutes.js
const express = require('express');
const { DateTime } = require('mssql');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { Schema } = mongoose;
// Configure MySQL connection
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Tehila@110702',
//   database: 'kiryatata',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const projectSchema = new Schema({
  code:Number,
  start_Date: String,
  finish_Date: String,
  target: Number,
  points: Number
});
const projectModel = mongoose.model('projects', projectSchema);
router.get('/', async (req, res) => {
 

  try {
    // Use await to wait for the query to complete
    const projacts = await projectModel.find();

    // Convert MongoDB documents to plain JavaScript objects
    const  projactData =  projacts.map( projactItem =>  projactItem.toObject());

    // Send the response with the plain JavaScript objects
    res.json(projactData);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
  
    // try {
    //   const [rows] = await pool.query('SELECT * FROM project');;
    //   res.status(200).json(rows);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
  });



router.post('/addPoints',async(req,res)=>{
  const {code,points}=req.body;
  try {
    const project = await projectModel.findOne({ code: code });

    if (project) {
      project.points = project.points + points;
      const result = await projectModel.updateOne({ code: code }, project);
      
    }
    res.json("success").status(200);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
//   const [existingProject] = await pool.query(`SELECT * FROM project WHERE code =${code}`, [code]);
//  try {
//   if (existingProject.length === 0) {
//     return res.status(404).json({ error: 'Student not found' });
//   }
//   await pool.query(`UPDATE project SET points = ${existingProject[0].points + points}  WHERE code =${code}`,[code]);
//  } catch (error) {
//   console.error(error);
//   res.status(500).json({ error: 'Internal Server Error' });

//  }
})


module.exports = router;
