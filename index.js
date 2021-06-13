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
                choices: ['A Department', 'A Role', 'All Employees', 'EXIT'],
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
                case 'All Employees':
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
                choices: ['A Department', 'A Role', 'All Employees', 'EXIT'],
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
                case 'All Employees':
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
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title '
    query += 'FROM role INNER JOIN employee ON employee.role_id = role.id RIGHT JOIN department ON department.id = role.department_id '
    query += 'WHERE ?'
    inquirer
      .prompt({
        name: 'spec',
        type: 'list',
        message: "Which department's employees would you like to view?",
        choices: ['Urban Design', 'Land Development', 'Landscape Architecture', 'Civil']
      })
      .then((answer) => {
        connection.query(query, { name: answer.spec }, (err, res) => {
          const persons = [];
          res.forEach(({ id, first_name, last_name, title }) => {
            const stats = {
              "ID": id,
              "First Name": first_name,
              "Last Name": last_name,
              "Title": title,
            }
            persons.push(stats);
          });
          console.table(persons);
          start();
        })
      })
}

const viewRole = () => {
    console.log("viewRole!")
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.salary '
  query += 'FROM role INNER JOIN employee ON employee.role_id = role.id RIGHT JoIN department ON department.id = role.department_id '
  query += 'WHERE ?'
  inquirer
    .prompt({
      name: 'role',
      type: 'list',
      message: 'Which role would you like to view?',
      choices: ["Planner", "Senior Planner", "Developer", "Senior Developer", "Architect", "Senior Architect", "Engineer", "Senior Engineer"]
    })
    .then((answer) => {
      connection.query(query, { title: answer.role }, (err, res) => {
        const empArray = []
        res.forEach(({ id, first_name, last_name, salary },) => {
          const empObject = {
            "ID": id,
            "First Name": first_name,
            "Last Name": last_name,
            "Salary": salary
          }
          empArray.push(empObject);
        })
        console.table(empArray);
        start();
      })
    })
};


const viewEmployee = () => {
    console.log("viewEmployee!")
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id, department.name,'
  query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM role INNER JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN department ON role.department_id = department.id;'
  connection.query(query, (err, res) => {
    const empArray = []
    res.forEach(({ id, first_name, last_name, title, salary, manager, name },) => {
      const empObject = {
        "ID": id,
        "First Name": first_name,
        "Last Name": last_name,
        "Title": title,
        "Salary": salary,
        "Manager": manager,
        "Department": name,
      }
      empArray.push(empObject);
    });
    console.table(empArray);
    start();
  })
}

const update = () => {
    console.log("update!")
}