const express = require('express');
const { Sequelize } = require('sequelize');
const studentRoutes =require('./routers/studentsRoutes')
const classesRouter=require("./routers/classesRouter")
const projectRouter=require("./routers/projectRoust")
const mysql = require('mysql2/promise');
const cors=require('cors')
require('./db/mongoConnect')





const app = express();
const PORT = 3001;

  
  app.use(cors());
  app.use(express.json());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use('/students', studentRoutes);
  app.use('/classes', classesRouter);
  app.use('/project',projectRouter);
  


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });