/* SERVICE FOR PARSE SERVER OPERATIONS ON 'Student' CLASS */
import Parse from 'parse'

/* CREATE operation - new student */
export const createStudent = (firstName, lastName, age, belt, courseId) => {
    const Student = Parse.Object.extend('Student')
    const student = new Student()
  
    student.set('firstName', firstName)
    student.set('lastName', lastName)
    student.set('age', age)
    student.set('belt', belt)
  
    // create a pointer to the Course class using the course ID
    const Course = Parse.Object.extend('Course')
    const coursePointer = new Course()
    coursePointer.id = courseId
  
    student.set('course', coursePointer) // set the course pointer in the student's Course column
  
    // save the student and return saved object
    return student.save().then((result) => {
      console.log('student created:', result)
      return result
    }).catch((error) => {
      console.error('error creating student:', error)
    })
}