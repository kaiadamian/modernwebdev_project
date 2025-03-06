import Home from './Home/Home.jsx'
import Courses from './Courses/Courses.jsx'
import Authenticate from './Authenticate/Authenticate.jsx'
import Navigation from './Navigation/Navigation.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function Components() {
    return (
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Courses />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Routes>
        </Router>
      )
}

export default Components