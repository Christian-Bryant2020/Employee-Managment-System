DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(12) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES 
    ("Urban Design"), 
    ("Land Development"), 
    ("Landscape Architecture"), 
    ("Civil");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Planner", 60000, 1), 
    ("Senior Planner", 80000, 1), 
    ("Developer", 70000, 2), 
    ("Senior Developer", 90000, 2), 
    ("Architect", 50000, 3), 
    ("Senior Architect", 70000, 3),
    ("Engineer", 95000, 4),
    ("Senior Engineer", 105000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("James", "J", 1, 4), 
    ("Adam", "A", 1, 4), 
    ("Ben", "B", 2, 4), 
    ("Christian", "C", 2, NULL), 
    ("Dane", "D", 3, 4), 
    ("Eli", "E", 3, 4), 
    ("Fiora", "F", 4, 10), 
    ("Greg", "G", 4, 10), 
    ("Hazel", "H", 5, 10), 
    ("Keven", "K", 5, NULL),
    ("Lian", "L", 6, 10),
    ("Melo", "M", 7, 10);

