// routes/studentRoutes.js
const express = require('express');
const { DateTime } = require('mssql');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { route } = require('./studentsRoutes');
const { Schema } = mongoose;
// const {studentModel,resetStudentPoints}=require("./studentsRoutes")


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
})


router.post('/resetPoints',async(req,res)=>
{
  try{
    const {code}=req.body;
    const project=await projectModel.findOne({code:code});

    if(project){
      project.points=0;
      const result = await projectModel.updateOne({ code: code }, project).toString();
      // const resultSturesetStudentPoints
  
      
    }else{
      return res.status(404).json({ error: 'Project not found' });
    }
    try {
      const projects = await projectModel.find();
      const  projactData =  await projects.map( projactItem =>  projactItem.toObject());
      res.json(projactData);
    } catch (error) {
      
    }
 
   
   
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


router.post('/update',async(req,res)=>
{

    try {
      const {project}=req.body;
      projetcFind=await projectModel.findOne({ code: project.code });
      projetcFind.startDate=project.startDate;
      projetcFind.finish_Date=project.finish_Date;
     
      const result = await projectModel.updateOne({ _id: project._id }, projetcFind)
      const projects = await projectModel.find();
      const  projactData =  await projects.map( projactItem =>  projactItem.toObject());
      res.json(projactData);
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
