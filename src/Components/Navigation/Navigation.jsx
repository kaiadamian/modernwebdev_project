import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => (
    <nav>
    <div className="navigation">
      <div className="logo"></div>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>
            <Link to="/auth">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
)

export default Navigation