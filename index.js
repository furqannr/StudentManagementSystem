import inquirer from "inquirer";
// let students: [{ name: string, age: number, grade: string }] = [];
// students[0] = { name: "Furqan", age: 7, grade: "A" };
// students[1] = { name: "Farman", age: 27, grade: "C" };
let students = [{ name: "Furqan", age: 7, grade: "A" }, { name: "Farman", age: 27, grade: "C" }];
function addStudent() {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the student\'s name?'
        },
        {
            type: 'input',
            name: 'age',
            message: 'What is the student\'s age?'
        },
        {
            type: 'input',
            name: 'grade',
            message: 'What is the student\'s grade?'
        }
    ])
        .then(answers => {
        students.push({
            name: answers.name,
            age: answers.age,
            grade: answers.grade
        });
        console.log('Student added successfully!');
        mainMenu();
    });
}
function viewStudents() {
    console.log('\n');
    console.table(students);
    mainMenu();
}
function editStudent() {
    if (students.length > 0) {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Which student do you want to edit? Enter Student name:'
            }
        ])
            .then(answer => {
            let index = 0;
            for (let i = 0; i < students.length; i++) {
                if (students[i].name === answer.name) {
                    index = i;
                }
            }
            inquirer
                .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'What is the student\'s new name?'
                },
                {
                    type: 'input',
                    name: 'age',
                    message: 'What is the student\'s new age?'
                },
                {
                    type: 'input',
                    name: 'grade',
                    message: 'What is the student\'s new grade?'
                }
            ])
                .then(answers => {
                students[index].name = answers.name;
                students[index].age = answers.age;
                students[index].grade = answers.grade;
                console.log('Student edited successfully!');
                mainMenu();
            });
        });
    }
    else {
        console.log('No students to edit!');
        mainMenu();
    }
}
function deleteStudent() {
    if (students.length > 0) {
        inquirer
            .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Which student do you want to delete?'
            }
        ])
            .then(answer => {
            let index = -1;
            for (let i = 0; i < students.length; i++) {
                if (students[i].name === answer.name) {
                    index = i;
                }
            }
            if (index == -1) {
                mainMenu();
            }
            else {
                students.splice(index, 1);
                console.log('Student deleted successfully!');
                mainMenu();
            }
        });
    }
    else {
        console.log('No students to delete!');
        mainMenu();
    }
}
function mainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?',
            choices: ['Add Student', 'View Students', 'Edit Student', 'Delete Student', 'Quit']
        }
    ])
        .then(answer => {
        if (answer.choice === 'Add Student') {
            addStudent();
        }
        else if (answer.choice === 'View Students') {
            viewStudents();
        }
        else if (answer.choice === 'Edit Student') {
            editStudent();
        }
        else if (answer.choice === 'Delete Student') {
            deleteStudent();
        }
        else {
            console.log('Goodbye!');
        }
    });
}
mainMenu();
