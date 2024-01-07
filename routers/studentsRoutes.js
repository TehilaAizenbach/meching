// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const studentSchema = new Schema({
  id: String,
  first_name:String,
  last_name:String,
  group:String,
  target: Number,
  points: Number
});
const studentModel = mongoose.model('students', studentSchema);

// const resetStudentPoints=async()=>{
//   try {
//     const students= await studentModel.find();
//     await students.forEach((studentItem)=> {
//       studentItem.points=0;
//       studentModel.findOneAndUpdate({id:studentItem.id},studentItem);
//     });
//   } catch (error) {
//     console.error('Error finding students:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } 
// }
router.get('/', async (req, res) => {
  

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
    const students=displayStudents();
    res.json(students).status(200);
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

router.post('/addStudents',async(req,res)=>{
})
router.post('/updateStudents',async(req,res)=>{

})
router.post('/resetPoints',async(req,res)=>{
  try {
    const students= await studentModel.find();
     await  students.forEach(async (studentItem) => {
      studentItem.points=0;
      await studentModel.findOneAndUpdate({id:studentItem.id},studentItem);
    });
    const studentsfind=await studentModel.find()
    const  studentData =  studentsfind.map( studentItem =>  studentItem.toObject());
    res.json(studentData);
  } catch (error) {
    console.error('Error finding students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } 
})


module.exports = router;
