/* Login Page - Stateful Parent Component */
import { useEffect, useState } from "react"
import { checkUser, loginUser } from "./AuthService"
import AuthForm from "./AuthForm"
import { useNavigate } from "react-router-dom"
import { Typography, Link as MUILink, Box } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const AuthLogin = () => {
    const navigate = useNavigate()

    const [currentUser, setCurrentUser] = useState({
        email: "",
        password: ""
    })

    const [add, setAdd] = useState(false)
    const [emailError, setEmailError] = useState(false)

    useEffect(() => {
        if (checkUser()) {
        alert("You are already logged in")
        navigate("/home")
        }
    }, [navigate])

    useEffect(() => {
        if (currentUser && add && !emailError) {
        loginUser(currentUser).then((userLoggedIn) => {
            if (userLoggedIn) {
            alert(`${userLoggedIn.get("firstName")}, you successfully logged in!`)
            navigate("/home")
            }
            setAdd(false)
        })
        }
  }, [navigate, currentUser, add, emailError])

  const onChangeHandler = (e) => {
        const { name, value } = e.target

        if (name === "email") {
        setEmailError(!value.endsWith("@nd.edu"))
        }

        setCurrentUser((prev) => ({
        ...prev,
        [name]: value
        }))
  }

  const onSubmitHandler = (e) => {
        e.preventDefault()
        if (!currentUser.email.endsWith("@nd.edu")) {
        setEmailError(true)
        return
        }
        setAdd(true)
  }

  return (
    <Box>
        <AuthForm
            user={currentUser}
            isLogin={true}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
            emailError={emailError}
        />
        
        {/* Routing to Register Page */}
        <Typography align="center" mt={2}>
            Don’t have an account?{" "}
            <MUILink component={RouterLink} to="/auth/register">
            Register here
            </MUILink>
        </Typography>
    </Box>
  )
}

export default AuthLogin