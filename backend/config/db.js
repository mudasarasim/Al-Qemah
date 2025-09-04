const mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'ghattourgroup.com',
  user: 'u705255933_gold_database',  // Your MySQL username
  password: 'Alqemah@122',          // Your MySQL password
  database: 'u705255933_gold_database', // Your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected (Pool)");
    connection.release();
  }
});

module.exports = pool;
