import {Link} from 'react-router-dom'
import './index.css'

const Header = () => {
  const hai = 'hai'
  return (
    <nav className="headerNavContainer">
      <div className="headerContainer1">
        <div>
          <img
            alt="name"
            src="https://res.cloudinary.com/de45if6nj/image/upload/v1678423221/Group_7399_huk8ml.svg"
          />
        </div>
        <ul className="headerList">
          <li>
            <Link className="headerHomeAndPopular" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="headerHomeAndPopular" to="/Popular">
              Popular
            </Link>
          </li>
        </ul>
      </div>
      <div className="headerContainer2">hai</div>
    </nav>
  )
}
export default Header
