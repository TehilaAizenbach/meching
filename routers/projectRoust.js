// routes/studentRoutes.js
const express = require('express');
const { DateTime } = require('mssql');
const router = express.Router();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { route } = require('./studentsRoutes');
const { Schema } = mongoose;
const {ProjectCtrl}=require('../controllers/projectController');
const {ClassCtrl}=require('../controllers/classControllers')
const {StudentsCtrl}=require('../controllers/studentsControllers')

// const {studentModel,resetStudentPoints}=require("./studentsRoutes")



router.get('/',ProjectCtrl.getProject);
router.post('/addPoints',ProjectCtrl.addPoints);
router.post('/resetPoints',async (req, res, next) => {
    try {
        await ClassCtrl.resetPoints(req, res, next);
        await ProjectCtrl.resetPoints(req, res, next);
        await StudentsCtrl.resetPoints(req,res,next)

        res.status(200).json('succes');

    } catch (error) {
        console.error('Error resetting points:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.post('/update',ProjectCtrl.update);

module.exports = router;
