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
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Would you like to add, view, or update?",
                name: 'task',
                choices: ['add', 'view', 'update', 'EXIT'],
            }
        ])
        .then((answer) => {
            if (answer.task === 'add') {
                add();
            } else if (answer.task === 'view') {
                view();
            } else if (answer.task === 'update') {
                update();
            } else if (answer.task === 'EXIT') {
                connection.end();
            }
        });
}
const add = () => {
    console.log("add!")
}
const view = () => {
    console.log("view!")
}
const update = () => {
    console.log("update!")
}