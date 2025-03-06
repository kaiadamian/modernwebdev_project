import { useState, useEffect } from 'react';
import { getAllCourses } from '../../Common/Services/CourseService.js';
import { createStudent } from '../../Common/Services/StudentService.js';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    belt: '',
    course: ''  // Store the selected course ID
  });

  const [courses, setCourses] = useState([]);

useEffect(() => {
    getAllCourses()
      .then((fetchedCourses) => {
        setCourses(fetchedCourses); // Set the fetched courses in state
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createStudent(formData.firstName, formData.lastName, parseInt(formData.age), formData.belt, formData.course);
  };

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
            {course.get('ageGroup')}
          </option>
        ))}    
      </select> 
      <button type="submit">Create Student</button>
    </form>
  );
};

export default StudentForm;