#! /usr/bin/env node
import inquirer from "inquirer";
// constructor function for student
const courses: { [x: string]: number } = {
  webDevelopment: 30000,
  cyberSecurity: 40000,
  englishLanguage: 15000,
  devOps: 45000,
  genAi: 60000,
};
function Student(
  name: string,
  age: number,
  amount: number,
  courseEnroll: string[]
) {
  //private properties
  let _name: string = name;
  let _age: number = age;
  let _amount: number = amount;
  let _id: number = (Math.floor(Math.random()*90000) + 10000);

  //getters
  function getId():number{
    return _id
  }

  // setters
  function setAmount(amount: number): void {
    _amount += amount;
    console.log(`Amount Submit successfully!`);
  }
  // fees calc method for enrolled courses
  function balance(): string {
    let charges: number = 0;
    courseEnroll.forEach((e) => (charges += courses[e]));
    if (_amount !== charges && _amount<charges) {
      return `${charges - _amount} Rs is remaining only/-`;
    } else {
      return "Fully Paid ! ";
    }
  }

  //display method for student status
  function status(): void {
    console.log("*****Student Status*****");
    console.log(
      `Name : ${_name} \n Age : ${_age} \n Id : ${_id} \n Courses Enrolled : ${courseEnroll} \n Fees Status : ${balance()}`
    );
  }
  // return an object with public methods
  return {
    status,
    balance,
    setAmount,
    getId,
  };
}
let studentList: {[x:string]:any}[] = [];
let flag = true
// User View Options function
while(flag){
const answers = await inquirer.prompt({
  message: "Select YOur Desired Option To move On :",
  type: "list",
  name: "options",
  choices: ['Courses',"Enroll Student","All Student","Delete Student",'Search Student','Add Payment','Exit'],
});
//Switching Options
switch (answers.options) {
  case 'Courses':{// display courses with fees
    for (const [key, value] of Object.entries(courses)) {
        console.log(`${key}: ${value} Rs`);
      }
    break;

  }
  case "Enroll Student": { //Enroll a new student
    const studentData = await inquirer.prompt([
      { message: "Enter Student Name:", type: "input", name: "studentName" },
      { message: "Enter Student Age:", type: "number", name: "age" },
      {
        message: "Select Courses You Want :",
        type: "checkbox",
        name: "courses",
        choices: [
          "webDevelopment",
          "cyberSecurity",
          "englishLanguage",
          "devOps",
          "genAi",
        ],
      },{ message: "Enter submitting amount :", type: "number", name: "amount"},
    ]);
    studentList.push(
      Student(
        studentData.studentName,
        studentData.age,
        studentData.amount,
        studentData.courses
      )
    );
    console.log('Student successfully enrolled .')
    break;
  }
  case "All Student":{ //Display status of all students
    studentList.forEach(e=>{
        e.status()
        console.log('***---***---***---***---***---***')
    })
    if(studentList.length === 0)
    {console.log('***No Record***')}
    break
  }
  case "Delete Student":{ // delete a student of specific Id only
   const idStudent = await inquirer.prompt({message:'Enter student Id :',type:'number',name :'stuId'})
    studentList.forEach((e,index)=>{
        if(e.getId() === idStudent.stuId)
        {
          delete studentList[index]
        }
    })
    console.log('student successfully deleted.')
    break;
  }
  case 'Search Student':{// search a student by id
    const idStudent = await inquirer.prompt({message:'Enter student Id :',type:'number',name :'stuId'})
    let flag = false
    studentList.forEach(e=>{
        if(e.getId() === idStudent.stuId)
        {
            e.status()
            flag =true
        }
    })
    if(flag === false){
        console.log('Record Not found!')
    }
    break;
  }
  case 'Add Payment':{
    const idStudent = await inquirer.prompt({message:'Enter student Id :',type:'number',name :'stuId'})
    let flag:boolean = false
    let targetStudent :{[x:string]:any}={}
    studentList.forEach(e=>{
        if(e.getId() === idStudent.stuId)
        {
            flag =true
            targetStudent = e
        }
    })
    if(flag === false){
        console.log('Record Not found!')
    }
    else{
      const stuAmount = await inquirer.prompt({message:'Enter Amount To Pay',type:'number',name:'leftFees'})
      targetStudent.setAmount(stuAmount.leftFees)
    }
    break
  }
  case 'Exit':{ // Enix the app
    flag=false
    break
  }
}
}
