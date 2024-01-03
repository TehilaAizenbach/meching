const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tehila@110702',
  database: 'kiryatata',
  connectionLimit: 10, // Adjust as needed
});

const promisePool = pool.promise();

async function runQuery() {
  try {
    const [rows, fields] = await promisePool.query('SELECT * FROM students_meching');
    console.log('Query Result:', rows);
  } catch (error) {
    console.error('Query Error:', error.message);
  } finally {
    // Optionally, release the connection back to the pool
    // This is important to prevent connection leaks
    // pool.end(); // Uncomment if you want to end the pool after executing the query
  }
}

runQuery();