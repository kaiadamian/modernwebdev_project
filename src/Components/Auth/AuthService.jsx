import Parse from "parse"
import './Auth.css'

// used in auth register component
export const createUser = (newUser) => {
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
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`)
    });
};

// used in auth login component
export const loginUser = (currUser) => {
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
    });
};

export const checkUser = () => {
  return Parse.User.current()?.authenticated
};

// log out the current user
export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      // after logging out, current user will be null
      const currentUser = Parse.User.current();
      console.log("Current user after logout:", currentUser);  // null
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
};

// get the current user
export const getUser = () => {
    return Parse.User.current(); 
};