import { useEffect, useState } from 'react'
import { getAllCourses } from '../../Common/Services/CourseService.js'
import './Courses.css'

/* retrieves all courses and displays them */
// in the future, this section would also account for unenrolling from a class via a delete service 
const CoursesDropdown = () => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null) 

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .catch((error) => console.error('Error fetching courses:', error))
  }, [])

  const handleCourseSelection = (e) => {
    const courseId = e.target.value
    const selectedCourse = courses.find((course) => course.id === courseId)
    setSelectedCourse(selectedCourse)
  }

  return (
    <div>
      <h2>Select a Course</h2>
      <select 
        value={selectedCourse ? selectedCourse.id : ''} 
        onChange={handleCourseSelection}
      >
        <option value="" disabled>Select a Class</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.get('ageGroup')} {course.get('days')} {course.get('time')} 
          </option>
        ))}
      </select>

      {selectedCourse && <p>Selected Course: {selectedCourse.get('ageGroup')}</p>}
    </div>
  )
}

export default CoursesDropdown
