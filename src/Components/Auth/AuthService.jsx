/* Authorization Services */
import Parse from "parse"

export const createUser = (newUser) => {
    // used in auth register component, creates a new user on Parse database
    const user = new Parse.User()

    user.set("username", newUser.email)
    user.set("firstName", newUser.firstName)
    user.set("lastName", newUser.lastName)
    user.set("password", newUser.password)
    user.set("email", newUser.email)

    console.log("User: ", user)
    return user
        .signUp()
        .then((newUserSaved) => {
        return newUserSaved
        })
        .catch((error) => {
        alert(`Error: ${error.message}`)
        })
}

export const loginUser = (currUser) => {
    // used in auth login component, logs in User if found on Parse database
    const user = new Parse.User()

    user.set("password", currUser.password)
    user.set("username", currUser.email)

    console.log("User: ", user)
    console.log()
    return user
        .logIn(user.email, user.password)
        .then((currUserSaved) => {
        return currUserSaved
        })
        .catch((error) => {
        alert(`Error: ${error.message}`)
        })
}

export const checkUser = () => {
    // used for protected routes to check if the user is authenticated
    return Parse.User.current()?.authenticated
}


export const logoutUser = () => {
    // log out the current user
    return Parse.User.logOut()
        .then(() => {
        // after logging out, current user will be null
        const currentUser = Parse.User.current()
        console.log("Current user after logout:", currentUser)  // null
        })
        .catch((error) => {
        console.error("Error logging out:", error)
        })
}

export const getUser = () => {
    // get the current user
    return Parse.User.current() 
}