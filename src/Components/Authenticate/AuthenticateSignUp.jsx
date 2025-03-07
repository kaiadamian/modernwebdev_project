import { useState, useEffect } from 'react'
import { getAllCourses } from '../../Common/Services/CourseService.js'
import { createStudent } from '../../Common/Services/StudentService.js'

/* retrieves user's information and creates a student with those attributes */
const AuthenticateSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    belt: '',
    course: ''
  })

  const [courses, setCourses] = useState([])

useEffect(() => {
    getAllCourses()
      .then((fetchedCourses) => {
        setCourses(fetchedCourses) // set the fetched courses in state
      })
      .catch((error) => console.error("error fetching courses:", error)) // in the future, we would like more robust error handling 
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createStudent(formData.firstName, formData.lastName, parseInt(formData.age), formData.belt, formData.course)
    .then(() => {
      alert('student created successfully!');

      // clear the form by resetting the formData state
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        belt: '',
        course: ''
      })
    })
    .catch((error) => {
      console.error('error creating student:', error);
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="belt" placeholder="Belt Color" onChange={handleChange} />

      <h2>Select a Class</h2>
      <select 
        name="course" // select element is tied to course in formData state
        value={formData.course}
        onChange={handleChange}
      >
        <option value="" disabled>Select a course</option> 
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.get('ageGroup')} {course.get('days')} {course.get('time')}
          </option>
        ))}    
      </select> 
      <button type="submit">Create Student</button>
    </form>
  )
}

export default AuthenticateSignUp