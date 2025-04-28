import Home from './Home/Home.jsx'
import Explore from './Explore/Explore.jsx'
import AuthRegister from "./Auth/AuthRegister"
import AuthLogin from "./Auth/AuthLogin"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"
import Navigation from './Navigation/Navigation.jsx'
import Contact from './Contact/Contact.jsx'
import ManageEvents from "./Home/ManageEvents.jsx";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'

function Components() {
    return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/auth" element={<AuthLogin />} />
            <Route path="/auth/register" element={<AuthRegister />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            <Route path="/home" element={<Home />} /> {/* able to be accessed by anyone */}
            <Route path="/explore" element={<Explore />} />  {/* able to be accessed by anyone */}
            <Route path="/manage" element={<ProtectedRoute element={ManageEvents} />} />
            <Route path="/contact" element={<ProtectedRoute path="/contact" element={Contact} />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} /> 
          </Routes>
        </Router>
      )
}

export default Components