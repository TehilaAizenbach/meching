// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Configure MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define routes for CRUD operations on students
// Example: router.get('/', getAllStudents);

module.exports = router;
