const express = require('express');
const { Sequelize } = require('sequelize');
const studentRoutes =require('./routers/studentsRoutes')
const classesRouter=require("./routers/classesRouter")
const projectRouter=require("./routers/projectRoust")
const mysql = require('mysql2/promise');
const cors=require('cors')





const app = express();
const PORT = 3001;
app.use(cors());
const sequelize = new Sequelize('kiryatata', 'root', 'Tehila@110702', {
    host: 'localhost',
    dialect: 'mysql',
  });
  

  app.use(express.json());
  app.use('/students', studentRoutes);
  app.use('/classes', classesRouter);
  app.use('/project',projectRouter)


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });