// /* SERVICE FOR PARSE SERVER OPERATIONS ON 'Student' CLASS */
// import Parse from "parse";

// // CREATE operation - new student
// export const createStudent = (firstName, lastName, age, belt) => {
//     console.log("Creating student:", firstName, lastName, age, belt);
  
//     const Student = Parse.Object.extend('Student');
//     const student = new Student();
  
//     // set student attributes
//     student.set('firstName', firstName)
//     student.set('lastName', lastName)
//     student.set('age', age)
//     student.set('belt', belt)
  
//     // save the new student object
//     return student.save().then((result) => {
//       console.log("Student created:", result);
//       return result;
//     }).catch(error => {
//       console.error("Error creating student:", error);
//     });
//   };
import Parse from 'parse'

export const createStudent = (firstName, lastName, age, belt, courseId) => {
    const Student = Parse.Object.extend('Student');
    const student = new Student();
  
    student.set('firstName', firstName);
    student.set('lastName', lastName);
    student.set('age', age);
    student.set('belt', belt);
  
    // Create a Pointer to the Course class using the course ID
    const Course = Parse.Object.extend('Course');
    const coursePointer = new Course();
    coursePointer.id = courseId; // Setting the course pointer with the course ID
  
    student.set('course', coursePointer); // Set the course pointer in the student's 'course' column
  
    // Save the student and return the result
    return student.save().then((result) => {
      console.log('Student created successfully with course!');
      return result; // Return the saved student object
    }).catch((error) => {
      console.error('Error creating student:', error);
    });
  };
  

// CREATE operation - new student
// export const createLesson = (Name) => {
//   console.log("Creating: ", Name);
//   const Lesson = Parse.Object.extend("Lesson");
//   const lesson = new Lesson();
//   // using setter to UPDATE the object
//   lesson.set("name", Name);
//   return lesson.save().then((result) => {
//     // returns new Student object
//     return result;
//   });
// };
