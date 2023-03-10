import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isError: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="loginBgContainer">
        <div className="movieName">
          <img
            alt="name"
            src="https://res.cloudinary.com/de45if6nj/image/upload/v1678423221/Group_7399_huk8ml.svg"
          />
        </div>
        <form onSubmit={this.onSubmit} className="loginCardContainer">
          <h1 className="loginHeading">Login</h1>
          <div className="fieldContainer">
            <label className="loginLabel" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              value={username}
              onChange={this.updateUsername}
              className="loginInput"
              id="username"
              type="text"
            />
            <br />
            <label className="loginLabel" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              value={password}
              onChange={this.updatePassword}
              className="loginInput"
              id="password"
              type="password"
            />
          </div>
          {isError ? <p className="error">{errorMsg}</p> : null}

          <button type="submit" className="loginButton">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
