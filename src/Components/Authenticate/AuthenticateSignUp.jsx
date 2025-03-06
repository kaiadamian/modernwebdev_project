// import { createStudent } from '../../Common/Services/StudentService.js'
// import { getAllCourses } from '../../Common/Services/CourseService.js'
// import { useState, useEffect } from 'react'

// const StudentForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     belt: '',
//     course: ''
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     createStudent(formData.firstName, formData.lastName, parseInt(formData.age), formData.belt);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
//       <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
//       <input type="number" name="age" placeholder="Age" onChange={handleChange} />
//       <input type="text" name="belt" placeholder="Belt Color" onChange={handleChange} />
//       <button type="submit">Create Student</button>
//     </form>
//   );
// };

// export default StudentForm;

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

  // Fetch courses when the component mounts
//   useEffect(() => {
//     getAllCourses()
//       .then(setCourses) // Set the fetched courses in state
//       .catch(error => console.error("Error fetching courses:", error));
//   }, []);
useEffect(() => {
    getAllCourses()
      .then((fetchedCourses) => {
        setCourses(fetchedCourses); // Set the fetched courses in state

        // Log the courses to inspect the data
        fetchedCourses.forEach((course) => {
          console.log(course); // Log the entire course object
          console.log(course.id); // Log the 'id' field, which should be the objectId
        });
      })
      .catch((error) => console.error("Error fetching courses:", error)); // in the future, we would like more robust error handling 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming createStudent expects the course ID to be passed as formData.course
    createStudent(formData.firstName, formData.lastName, parseInt(formData.age), formData.belt, formData.course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="number" name="age" placeholder="Age" onChange={handleChange} />
      <input type="text" name="belt" placeholder="Belt Color" onChange={handleChange} />

      <h2>Select a Course</h2>
      <select 
        name="course" // Select element is tied to course in formData state
        value={formData.course}
        onChange={handleChange}
      >
        <option value="" disabled>Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}> {/* course.id is the objectId */}
            {course.id} {/* Display the ageGroup or any other field */}
          </option>
        ))}    
      </select> 
      <button type="submit">Create Student</button>
    </form>
  );
};

export default StudentForm;



