import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import './Welcome.css';
const logo = require('../assets/images/logo_200228.png');

class Welcome extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "EmilyS",
      password: "123",
      warning: false
    };
  }

  handleInput = event => {
    this.setState({
        [event.target.name]: event.target.value
    });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    let payload = { username, password };

    let response = null;
    try {
      response = await axios.post("http://localhost:11500/creators/auth", payload);
    } catch (error) {
      console.log(error);
    }

    if (response.data.status === "success") {
      const { id, username, avatar_url } = response.data.payload;
      this.setState({
        warning: false
      });
      this.props.setUser(id, username, avatar_url);
    } else {
      this.setState({
        warning: true
      });
    }
  };

  render() {
    const { username, password, warning } = this.state;
    return (
      <div className="welcome">
        <h1>Welcome to</h1>
        <img src={logo} className="landing-logo" alt="Greenlist"/>
        <br />
        <form onSubmit={this.submitForm}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder=""
            onChange={this.handleInput}
            name="username"
            value={username}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder=""
            onChange={this.handleInput}
            name="password"
            value={password}
          />
          <button>Log In</button>
        </form>
        <Link to="/register">
          New user? Click here to sign up!
        </Link>
        <p className="warning">
          {warning === true ? "incorrect username or password" : ""}
        </p>
        <br />
        <strong>DEMO LOGIN</strong><br />
        Username: EmilyS<br />
        Password: 123<br />
        <br />
      </div>
    );
  }
}

export default withRouter(Welcome);
