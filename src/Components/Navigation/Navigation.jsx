import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => (
  <navigation>
    <nav>
    <div class="navigation">
      <div class="logo"></div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/register">Classes</Link>
          </li>
          <li>
            <Link to="/authenticate">Sign In</Link>
          </li>
        </ul>
      </div>
    </nav>
  </navigation>
)

export default Navigation