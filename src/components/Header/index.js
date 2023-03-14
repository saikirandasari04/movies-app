import {Link, withRouter} from 'react-router-dom'
import {Component} from 'react'

import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showMenu: false,
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onClickHideMenu = () => {
    this.setState({showMenu: false})
  }

  render() {
    const {showMenu} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassNameStyling
    let popularClassNameStyling
    let accountClassNameStyling

    switch (path) {
      case '/popular':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/profile':
        homeClassNameStyling = 'passive'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      default:
        homeClassNameStyling = 'active'
        popularClassNameStyling = 'passive'
        accountClassNameStyling = 'passive'
        break
    }

    return (
      <nav className="nav-container">
        <div className="nav-elements-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
              className="app-logo"
              alt="website logo"
            />
          </Link>
          <ul className="nav-list-items">
            <li className={`popup-heading ${homeClassNameStyling}`}>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className={`popup-heading ${popularClassNameStyling}`}>
              <Link to="/popular" className="nav-link">
                Popular
              </Link>
            </li>
          </ul>
          <div className="search-container">
            <Link to="/search">
              <button
                type="button"
                className="icon-button"
                testid="searchButton"
              >
                <HiOutlineSearch size={20} color="white" />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                className={`profile-logo ${accountClassNameStyling}`}
                alt="profile"
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="white"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="list-mini">
              <li className={`popup-heading ${homeClassNameStyling}`}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className={`popup-heading ${popularClassNameStyling}`}>
                <Link to="/popular" className="nav-link">
                  Popular
                </Link>
              </li>

              <li className={`popup-heading ${accountClassNameStyling}`}>
                <Link to="/account" className="nav-link">
                  Account
                </Link>
              </li>

              <ImCross
                size={10}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
