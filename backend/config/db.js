const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'ghattourgroup.com',
  user: 'u705255933_gold_database',     // apna MySQL username
  password: 'Alqemah@122',     // apna MySQL password
  database: 'u705255933_gold_database'  // apna database ka naam
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database');
  }
});

module.exports = db;
