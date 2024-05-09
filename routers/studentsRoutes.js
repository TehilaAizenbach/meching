// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const {StudentsCtrl}=require('../controllers/studentsControllers')
const {ClassCtrl}=require('../controllers/classControllers');
const { ProjectCtrl } = require('../controllers/projectController');
const { Schema } = mongoose;

router.get('/',StudentsCtrl.getStudents);
router.get('/findStudentsByClass/:group',StudentsCtrl.findByClass);
router.post('/addPoints',async(req,res,next)=>{
    try {
        await StudentsCtrl.addPoints(req, res, next)
        await ProjectCtrl.addPoints(req, res, next)
        await ClassCtrl.addPoints(req, res, next)

        res.status(200).json('success')
    } catch (error) {
        console.error('Error resetting points:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/addStudent',StudentsCtrl.addStudents,ProjectCtrl.update());
router.post('/updateStudent',StudentsCtrl.updateStudent)
router.post('/deleteStudent',StudentsCtrl.deleteStudent)



module.exports = router;
