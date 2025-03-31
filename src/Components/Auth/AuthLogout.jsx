import Parse from "parse"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "./AuthService"
import './Auth.css'

const AuthLogout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logoutUser()  // call logoutUser from AuthService
        .then(() => {
          // current user will be null after logout
          console.log("User logged out successfully");
  
          // redirect to login page
          navigate("/auth/login");
        })
        .catch((error) => {
          // handle errors from AuthService
          console.error("Error logging out:", error);
        });
    };

  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default AuthLogout
