const studentNames = [  "Oliver Allen",  "Charlotte Bell",  "Lucas Brown",  "Luna Carter",  "Ethan Cooper",  "Avery Davis",  "Mia Edwards",  "Noah Foster",  "Aria Green",  "Elijah Hernandez"];

const students = [];

for (let i = 0; i < studentNames.length; i++) {
  const [firstName, lastName] = studentNames[i].split(" ");
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.edu`;
  students.push({ firstName, lastName, email });
}

const jsonStudents = JSON.stringify(students);

console.log(jsonStudents);
