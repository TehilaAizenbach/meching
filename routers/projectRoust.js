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
      const [rows] = await pool.query('SELECT * FROM project');;
      res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.post('/addPoints',async(req,res)=>{
  const {code,points}=req.body;
  const [existingProject] = await pool.query(`SELECT * FROM project WHERE code =${code}`, [code]);
 try {
  if (existingProject.length === 0) {
    return res.status(404).json({ error: 'Student not found' });
  }
  await pool.query(`UPDATE project SET points = ${existingProject[0].points + points}  WHERE code =${code}`,[code]);
 } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });

 }
})


module.exports = router;
