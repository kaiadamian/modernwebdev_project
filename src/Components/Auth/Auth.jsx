import { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "./AuthService";
import './Auth.css'

const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      const user = checkUser()
      alert("You are already logged in");
      navigate("/home");
    }
  }, [navigate]);

  return (
    <div>
      <Link to="/auth/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/auth/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;