// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

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

router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM classes');;
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post('/addPoints',async(req,res)=>{
  const {name,points}=req.body;
  const [existingClasses] = await pool.query(`SELECT * FROM classes WHERE class_name ='${name}'`, [name]);
 try {
  if (existingClasses.length === 0) {
    return res.status(404).json({ error: 'Student not found' });
  }
  await pool.query(`UPDATE classes SET points = ${existingClasses[0].points + points}  WHERE class_name = '${name}'`,[name]);
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });

 }
})


module.exports = router;
