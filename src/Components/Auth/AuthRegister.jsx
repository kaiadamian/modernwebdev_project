/* Register Page - Stateful Parent Component */
import { useEffect, useState } from "react"
import { checkUser, createUser } from "./AuthService"
import AuthForm from "./AuthForm"
import { useNavigate } from "react-router-dom"
import { Typography, Link as MUILink, Box, Button } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

const AuthRegister = () => {
    const navigate = useNavigate()

    // store form input
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        avatar: null
    })

    // trigger login on form submission
    const [add, setAdd] = useState(false)

    // handle invalid emails
    const [emailError, setEmailError] = useState(false)

    // redirect already logged-in users to home page
    useEffect(() => {
        if (checkUser()) {
        alert("You are already logged in")
        navigate("/home")
        }
    }, [navigate])

    // create a new user and automatically navigate to home
    useEffect(() => {
        if (newUser && add && !emailError) {
        createUser(newUser).then((userCreated) => {
            if (userCreated) {
            alert(`${userCreated.get("firstName")}, you successfully registered!`)
            navigate("/home")
            }
            setAdd(false)
        })
        }
    }, [navigate, newUser, add, emailError])

    // update form input and set email error
    const onChangeHandler = (e) => {
        const { name, value } = e.target

        if (name === "email") {
        setEmailError(!value.endsWith("@nd.edu"))
        }

        setNewUser((prev) => ({
        ...prev,
        [name]: value
        }))
    }

    // validate email and trigger useEffect to create new user
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (!newUser.email.endsWith("@nd.edu")) {
        setEmailError(true)
        return
        }
        setAdd(true)
    }

    return (
        // pass data down to auth form
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={8}
            gap={1}
        >
        <AuthForm
            user={newUser}
            isLogin={false}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
            emailError={emailError}
        />

        {/* Routing to Login Page */}
        <Typography align="center" mt={2}>
            Already have an account?{" "}
            <MUILink component={RouterLink} to="/auth/login">
            Log in here
            </MUILink>
        </Typography>
        </Box>
    )
}

export default AuthRegister
