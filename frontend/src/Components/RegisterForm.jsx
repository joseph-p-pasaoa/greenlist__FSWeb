import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'

class RegisterForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone_number: "",
      about: "",
      website_url: "",
      address: "",
      avatarFile: null,
      warning: false
    };
  }

  handleInputs = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFileInput = (e) => {
    this.setState({
        avatarFile: e.target.files[0]
    });
  }

  submitForm = async (event) => {
    event.preventDefault(); 
    
    let {username, firstname, lastname, email, password, phone_number, about, website_url, address, avatarFile} = this.state
    const creatorPost = new FormData();

    creatorPost.append("username", username);
    creatorPost.append("firstname", firstname);
    creatorPost.append("lastname", lastname);
    creatorPost.append("password", password);
    creatorPost.append("email", email);
    creatorPost.append("about", about);
    creatorPost.append("phone_number", phone_number);
    creatorPost.append("website_url", website_url);
    creatorPost.append("address", address);
    creatorPost.append("avatarFile", avatarFile);

    let response = null;
    try {
        response = await axios.post('http://localhost:11500/creators/add', creatorPost);
    } catch(error) {
        console.log(error)
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
  }

  render() {
    return (
      <div className="container-stage">
        <div className="center-this">
          <h1>Register Form</h1>
          <br />
          <Link to="/">
            Already have an account? Click here to login.
          </Link>
          <form onSubmit={this.submitForm} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Password"
              name="password"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="About"
              name="about"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Website URL (optional)"
              name="website_url"
              onChange={this.handleInputs}
            />

            <input
              type="text"
              placeholder="Address (optional)"
              name="address"
              onChange={this.handleInputs}
            />

            {/* file input */}
            <label>Upload Avatar
              <input
                type="file"
                accept="image/*"
                onInput={this.handleFileInput}
                onChange={e => e.target.value}
              />
            </label>

            <button>Sign Up</button>
          </form>
          <p className="warning">
            {this.state.warning === true ? "Invalid inputs. Please fill out the fields correctly and try again" : ""}
          </p>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
