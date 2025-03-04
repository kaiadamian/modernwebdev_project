/* SERVICE FOR PARSE SERVER OPERATIONS ON 'Course' CLASS */
import Parse from 'parse'

// READ operation - get all courses
export const getAllCourses = () => {
    const Course = Parse.Object.extend('Course');
    const query = new Parse.Query(Course);

    return query.find()
        .then(results => {
            console.log("Classes fetched successfully:", results);
            return results; // return the array of Course objects
        })
        .catch(error => {
            console.error("Error fetching classes:", error);
            return []; // return an empty array in case of an error
        });
};