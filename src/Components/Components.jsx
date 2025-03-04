import Home from './Home/Home.jsx'
import Register from './Register/Register.jsx'
import Authenticate from './Authenticate/Authenticate.jsx'
import Navigation from './Navigation/Navigation.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Components() {
    return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </Router>
      )
}

export default Components