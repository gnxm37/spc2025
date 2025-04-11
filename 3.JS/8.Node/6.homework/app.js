const Person = require('./Person');
const Employee = require('./Employee');
const Student = require('./Student');

const person = new Person('유진');
const person_greet = person.greet();
console.log(person_greet);

const employee = new Employee('민수','강사');
const employee_greet = employee.greet();
console.log(employee_greet);

const student = new Student('유진');
student.major = "컴퓨터공학과";
const student_greet = student.greet();
console.log(student_greet);

