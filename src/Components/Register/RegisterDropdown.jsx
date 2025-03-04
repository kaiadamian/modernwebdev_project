// import { useEffect, useState } from 'react'
// import { getAllCourses } from '../../Common/Services/CourseService.js'

// const RegisterDropdown = () => {
//     const [courses, setCourses] = useState([]);
//     const [selectedCourse, setSelectedCourse] = useState('');

//     // fetch courses
//     useEffect(() => {
//         getAllCourses()
//             .then(setCourses) // set fetched courses in state
//             .catch(error => console.error("Error fetching courses:", error));
//     }, []);

//     return (
//         <div>
//             <h2>Select a Course</h2>
//             <select 
//                 value={selectedCourse} 
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//             >
//                 <option value="" disabled>Select a course</option>
//                 {courses.map(course => (
//                     <option key={course.id} value={course.id}>
//                         {course.get('ageGroup')}
//                     </option>
//                 ))}
//             </select>
            
//             {selectedCourse && <p>Selected Course ID: {selectedCourse}</p>}
//         </div>
//     )
// }

// export default RegisterDropdown

import { useEffect, useState } from 'react';
import { getAllCourses } from '../../Common/Services/CourseService.js';
import Parse from 'parse';

const RegisterDropdown = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // Storing the selected course object
  const [student, setStudent] = useState(Parse.User.current()); // Assuming current user is the student

  // Fetch courses
  useEffect(() => {
    getAllCourses()
      .then(setCourses) // set fetched courses in state
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  // Handle course selection
  const handleCourseSelection = (e) => {
    const courseId = e.target.value;
    const selectedCourse = courses.find((course) => course.id === courseId); // Get the course object
    if (selectedCourse) {
      setSelectedCourse(selectedCourse); // Update selected course state
    }
  };

  // Update student's course column
  const handleRegisterCourse = () => {
    if (!student) {
      alert("Please log in to register for a course.");
      return;  // Stop the function if the user is not logged in
    }

    if (!selectedCourse) {
      alert("Please select a course.");
      return;
    }

    // Set the course field to the selected course (pointer)
    student.set('course', selectedCourse);
    
    // Save the updated student object
    student.save()
      .then(() => {
        console.log('Course registered successfully');
      })
      .catch((error) => {
        console.error('Error registering course:', error);
      });
  };

  return (
    <div>
      <h2>Select a Course</h2>
      <select 
        value={selectedCourse ? selectedCourse.id : ''} // Set the selected course value
        onChange={handleCourseSelection}
      >
        <option value="" disabled>Select a course</option>
        {courses.map((course) => (
          <option key={course.id} value={course.id}>
            {course.get('ageGroup')}
          </option>
        ))}
      </select>
      
      {selectedCourse && (
        <div>
          <p>Selected Course: {selectedCourse.get('ageGroup')}</p>
          <button onClick={handleRegisterCourse}>Register for Course</button>
        </div>
      )}
    </div>
  );
};

export default RegisterDropdown;
