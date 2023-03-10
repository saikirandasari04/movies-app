import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="headerNavContainer">
    <div className="headerContainer1">
      <Link to="/">
        <img
          alt="name"
          src="https://res.cloudinary.com/de45if6nj/image/upload/v1678423221/Group_7399_huk8ml.svg"
        />
      </Link>
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
    <ul className="headerContainer2">
      <li>
        <Link to="/search">
          <img
            className="headerAvatar"
            alt="search"
            src="https://res.cloudinary.com/de45if6nj/image/upload/v1678447720/Color_Fill_nel0xi.svg"
          />
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <img
            className="headerAvatar"
            alt="avatar"
            src="https://res.cloudinary.com/de45if6nj/image/upload/v1678447836/Avatar_pwisw9.jpg"
          />
        </Link>
      </li>
    </ul>
  </nav>
)

export default Header
