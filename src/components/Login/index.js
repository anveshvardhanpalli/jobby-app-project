import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="userName">USERNAME</label>
        <input
          type="text"
          id="userName"
          value={username}
          onChange={this.onChangeUserName}
          placeholder="Username"
          className="input-tag"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          className="input-tag"
        />
      </>
    )
  }

  render() {
    const {errorMsg, showSubmitError} = this.state
    return (
      <div className="login-main-container">
        <form className="image-input-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website-logo"
            className="website-logo"
          />
          <div className="input-con">{this.renderUserName()}</div>
          <div className="input-con">{this.renderPassword()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
