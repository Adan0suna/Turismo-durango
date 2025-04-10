import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db-turismo2025mysql.cv42waa86l8l.us-west-1.rds.amazonaws.com',
  user: 'Jairo-DEV',
  password: 'Jairo123456789',
  database: 'test',
});

export default pool;