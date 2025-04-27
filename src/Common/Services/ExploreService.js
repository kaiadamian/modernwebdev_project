/* SERVICE FOR PARSE SERVER OPERATIONS ON 'Dorm' CLASS */
import Parse from 'parse'

/* READ operation - get all dorms */
export const getAllDorms = () => {
    const Dorm = Parse.Object.extend('Dorm');
    const query = new Parse.Query(Dorm);

    return query.find()
        .then(results => {
            console.log("Dorms fetched successfully:", results);
            return results; // return the array of Dorm objects
        })
        .catch(error => {
            console.error("Error fetching dorms:", error);
            return []; // return an empty array in case of an error
        })
}