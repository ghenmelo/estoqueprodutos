import mysql from 'mysql2'
require('dotenv').config({  
  path: process.env.NODE_ENV === "prod" ? ".envProd" : ".env"
});

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_DATABASE
} = process.env;

const con = mysql.createPool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port : DATABASE_PORT ? parseInt(DATABASE_PORT) : 3006,
  database : DATABASE_DATABASE,
}).promise();

export default con;