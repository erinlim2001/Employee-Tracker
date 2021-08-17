
const mysql = require('mysql2');
var inquirer = require('inquirer');
const consoleTable = require("console.table");


const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'GLRmnty314!',
        database: 'employee_db'
    },
    console.log(`Connected to the database.`)
);
const start = () => {
    inquirer.prompt([{
            type: 'list',
            message: "What would you like to do?",
            name: 'answer',
            choices: [
                'View all Employees',
                'View All Roles',
                'View all Departments', 
                'Update Employee',
                'Add Employee',
                'Add Role',
                'Add Department'
            ]
        }])
        .then((response) => {
            console.log(response)
            switch (response.answer) {
                case "View all Employees":
                   viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View all Departments":
                    viewAllDepartments();
                    break;
                case "Add Employee":
                    addNewEmployee();
                    break;
                case "Update Employee":
                    updateEmployee();
                      break;
              
                case "Add Role":
                    addRole();
                      break;
              
                case "Add Department":
                    addDepartment();
                      break;
            }
        })

}

function addNewEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's first name",
          name: "firstName"
        },
        {
          type: "input",
          message: "Enter the employee's last name",
          name: "lastName"
        },
        {
          type: "input",
          message: "Enter the employee's role ID",
          name: "addEmployRole"
        },
        {
          type: "input",
          message: "Enter the employee's manager ID",
          name: "addEmployManager"
        }
      ])
      .then(function (res) {
        const firstName = res.firstName;
        const lastName = res.lastName;
        const employRoleID = res.addEmployRole;
        const employManagerID = res.addEmployManager;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${employRoleID}", "${employManagerID}")`;
        db.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          start();
        });
      });
  }
function viewAllEmployees() {
    db.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    db.query(`SELECT * FROM role;`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        start();
    });
}

function viewAllDepartments() {
    db.query(`SELECT * FROM department;`, (err, res) => {
        if (err) {
            console.log(err);
        }
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "newDepartment"
      })
      .then(function (res) {
        const newDepartment = res.newDepartment;
        const query = `INSERT INTO department (name) VALUES ("${newDepartment}")`;
        db.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          start();
        });
      });
  }
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter the employee's title",
          name: "title"
        },
        {
          type: "input",
          message: "Enter the employee's salary",
          name: "salary"
        },
        {
          type: "input",
          message: "Enter the employee's department ID",
          name: "id"
        }
      ])
      .then(function (res) {
        const title = res.title;
        const salary = res.salary;
        const departmentID = res.id;
        const query = `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${departmentID}")`;
        db.query(query, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          start();
        });
      });
  }
  
  function updateEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the employee's ID you want to be updated",
        name: "updateEmployee"
      },
      {
        type: "input",
        message: "Enter the new role ID for that employee",
        name: "newRole"
      }
    ])
    .then(function (res) {
        const updateEmployee = res.updateEmployee;
        const newRole = res.newRole;
        const queryUpdate = `UPDATE employee SET role_id = "${newRole}" WHERE id = "${updateEmployee}"`;
        db.query(queryUpdate, function (err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          start();
        })
      });
    }
  
start();

