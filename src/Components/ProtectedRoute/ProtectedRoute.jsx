/* ProtectedRoute - used for managing protected routes */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { checkUser } from "../Auth/AuthService";

const ProtectedRoute = ({ element: Component, ...rest }) => {
    console.log("element: ", Component)
    const navigate = useNavigate()

    useEffect(() => {
        // if the user is not authenticated, redirect to the login page
        if (!checkUser()) {
        navigate("/auth/login")
        }
    }, [navigate])

    // if the user is authenticated, render the component
    if (checkUser()) {
        return <Component />
    }
};

export default ProtectedRoute
