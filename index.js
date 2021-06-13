const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Kitty08967!',
  database: 'employeeDB',
});

// Connecting to MySQL Server & SQL Database
connection.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {

}