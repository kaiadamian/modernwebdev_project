import Home from './Home/Home.jsx'
import Courses from './Courses/Courses.jsx'
import AuthModule from './Auth/Auth.jsx'
import AuthRegister from "./Auth/AuthRegister"
import AuthLogin from "./Auth/AuthLogin"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"
import Navigation from './Navigation/Navigation.jsx'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

function Components() {
    return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/auth" element={<AuthModule />} />
            <Route path="/auth/register" element={<AuthRegister />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            <Route path="/home" element={<ProtectedRoute path="/home" element={Home} />} />
            <Route path="/courses" element={<ProtectedRoute path="/courses" element={Courses} />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} /> 
          </Routes>
        </Router>
      )
}

export default Components