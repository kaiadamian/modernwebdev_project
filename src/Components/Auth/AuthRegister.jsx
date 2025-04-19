import { useEffect, useState } from "react";
import { checkUser, createUser } from "./AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import { Typography, Link as MUILink, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [add, setAdd] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    if (newUser && add && !emailError) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(`${userCreated.get("firstName")}, you successfully registered!`);
          navigate("/home");
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add, emailError]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmailError(!value.endsWith("@nd.edu"));
    }

    setNewUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!newUser.email.endsWith("@nd.edu")) {
      setEmailError(true);
      return;
    }
    setAdd(true);
  };

  return (
    <Box>
      <AuthForm
        user={newUser}
        isLogin={false}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        emailError={emailError}
      />

      <Typography align="center" mt={2}>
        Already have an account?{" "}
        <MUILink component={RouterLink} to="/auth/login">
          Log in here
        </MUILink>
      </Typography>
    </Box>
  );
};

export default AuthRegister;
