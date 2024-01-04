// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Configure MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tehila@110702',
  database: 'kiryatata',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const studentSchema = new Schema({
  id: String,
  first_name:String,
  last_name:String,
  group:String,
  target: Number,
  points: Number
});
router.get('/', async (req, res) => {
  const studentModel = mongoose.model('students', studentSchema);

  try {
    // Use await to wait for the query to complete
    const students = await studentModel.find();

    // Convert MongoDB documents to plain JavaScript objects
    const studentsData = students.map(studentItem => studentItem.toObject());

    // Send the response with the plain JavaScript objects
    res.json(studentsData);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 

    // try {
    //   const [rows] = await pool.query('SELECT * FROM student');
    //   res.status(200).json(rows);
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).json({ error: 'Internal Server Error' });
    // }
  });

router.post('/addPoints',async(req,res)=>{
  const {id,points}=req.body;
  const studentModel = mongoose.model('students', studentSchema);
  try {
    const student = await studentModel.findOne({ id: id });

    if (student) {
      student.points = student.points + points;
      const result = await studentModel.updateOne({ id: id }, student);
      
    }
    res.json("success").status(200);
  } catch (error) {
    console.error('Error finding classes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
  //   const [existingStudent] = await pool.query(`SELECT * FROM student WHERE id = ${id}`, [id]);
  // try {
  //   if (existingStudent.length === 0) {
  //     return res.status(404).json({ error: 'Student not found' });
  //   }
  //   await pool.query(`UPDATE student SET points = ${existingStudent[0].points + points}  WHERE id = ${id}`);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal Server Error' });

 });


module.exports = router;
