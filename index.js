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
    
    inquirer
        .prompt([
            {
                name: 'addX',
                message: "Would you like to add...?",
                type: 'list',
                choices: ['A Department', 'A Role', 'An Employee', 'EXIT'],
            }
        ])
        .then((answer => {
            switch (answer.addX) {
                case 'A Department':
                    addDepartment();
                    break;
                case 'A Role':
                    addRole();
                    break;
                case 'An Employee':
                    addEmployee();
                    break;
                case 'EXIT':
                    connection.end();
                    break;
            }
        }))
};

const view = () => {
    console.log("view!")

    inquirer
        .prompt([
            {
                name: 'viewX',
                message: "Would you like to view...?",
                type: 'list',
                choices: ['A Department', 'A Role', 'An Employee', 'EXIT'],
            }
        ])
        .then((answer => {
            switch (answer.viewX) {
                case 'A Department':
                    viewDepartment();
                    break;
                case 'A Role':
                    viewRole();
                    break;
                case 'An Employee':
                    viewEmployee();
                    break;
                case 'EXIT':
                    connection.end();
                    break;
            }
        }))
}
const addDepartment = () => {
    console.log("addDepartment!")
}

const addRole = () => {
    console.log("addRole!")
}

const addEmployee = () => {
    console.log("addEmployee!")
}

const viewDepartment = () => {
    console.log("viewDepartment!")
}

const viewRole = () => {
    console.log("viewRole!")
}

const viewEmployee = () => {
    console.log("viewEmployee!")
}

const update = () => {
    console.log("update!")
}