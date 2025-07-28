const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',        //usuario de PostgreSQL
  host: 'localhost',       // o la IP del servidor
  database: 'db_lockey',  // nombre de la base de datos
  password: 'San30667102.', //contraseña
  port: 5432,              // puerto por defecto de PostgreSQL
});

module.exports = pool;
