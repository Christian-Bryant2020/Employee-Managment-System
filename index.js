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
    inquirer
    .prompt({
      name: 'newDept',
      type: 'input',
      message: 'Please enter the name of the department you would like to add.',
    })
    .then((answer) => {
      connection.query('INSERT INTO department SET ?',
        {
          name: answer.newDept,
        },
        (err) => {
          if (err) throw err;
          console.log('Your department has been added.');
          start();
        });
    });
};


const addRole = () => {
    console.log("addRole!")
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: 'addRole',
              type: 'input',
              message: 'Please enter the name of the role you would like to add.',
            },
            {
              name: 'addRoleSalary',
              type: 'input',
              message: 'Please enter the salary of the role you just added.'
            },
            {
              name: 'deptID',
              type: 'list',
              message: 'Please name the department the role will be in.',
              choices() {
                const deptArray = [];
                for (let i = 0; i < res.length; i++) {
                  deptArray.push(`${i + 1} ${res[i].name}`);
                }
                return deptArray;
              },
            }])
          .then((answer) => {
            connection.query('INSERT INTO role SET ?',
              {
                title: answer.addRole,
                salary: answer.addRoleSalary,
                department_id: answer.deptID.split('')[0]
              },
              (err) => {
                if (err) throw err;
                console.log('Your role has been added.');
                start();
              });
          });
      })
    };

const addEmployee = () => {
    console.log("addEmployee!")
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: 'firstName',
              type: 'input',
              message: "Please enter the first name of the employee you'd like to add.",
            },
            {
              name: 'lastName',
              type: 'input',
              message: "Please enter the last name of the employee you'd like to add.",
            },
            {
              name: 'roleID',
              type: 'list',
              message: 'Please name of the role the employee will have.',
              choices() {
                const roleArray = [];
                for (let i = 0; i < res.length; i++) {
                  roleArray.push(`${i + 1} ${res[i].title}`);
                }
                return roleArray;
              },
            }])
          .then((answer) => {
            connection.query('INSERT INTO employee SET ?',
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleID.split('')[0]
              },
              (err) => {
                if (err) throw err;
                console.log('Added successfully.');
                start();
              });
          });
      })
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
        const persons = []
        res.forEach(({ id, first_name, last_name, salary },) => {
          const specs = {
            "ID": id,
            "First Name": first_name,
            "Last Name": last_name,
            "Salary": salary
          }
          persons.push(specs);
        })
        console.table(persons);
        start();
      })
    })
};


const viewEmployee = () => {
    console.log("viewEmployee!")
    let query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, employee.manager_id, department.name,'
  query += 'CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM role INNER JOIN employee ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id INNER JOIN department ON role.department_id = department.id;'
  connection.query(query, (err, res) => {
    const persons = []
    res.forEach(({ id, first_name, last_name, title, salary, manager, name },) => {
      const specs = {
        "ID": id,
        "First Name": first_name,
        "Last Name": last_name,
        "Title": title,
        "Salary": salary,
        "Manager": manager,
        "Department": name,
      }
      persons.push(specs);
    });
    console.table(persons);
    start();
  })
}

const update = () => {
    console.log("update!")
}