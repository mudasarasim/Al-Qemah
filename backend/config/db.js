const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     // apna MySQL username
  password: '',     // apna MySQL password
  database: 'gold_database'  // apna database ka naam
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

module.exports = db;
