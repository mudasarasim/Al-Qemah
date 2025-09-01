const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'ghattourgroup.com',
  user: 'u705255933_gold_database',  // Your MySQL username
  password: 'Alqemah@122',          // Your MySQL password
  database: 'u705255933_gold_database', // Your DB name
  waitForConnections: true,
  connectionLimit: 10,  // Maximum number of connections in pool
  queueLimit: 0         // Unlimited queued requests
});

// Check connection (optional)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL Database using Pool');
    connection.release(); // Release connection back to pool
  }
});

// Export pool
module.exports = pool.promise(); // use .promise() for async/await support
