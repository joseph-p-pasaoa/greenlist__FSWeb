import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'

import './RegisterForm.css';


class RegisterForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      about: "",
      website_url: "",
      address: "",
      avatarFile: null,
      warning: false,
      errorMsg: ""
    };
  }


  // REFS CREATION
  refNameInput = React.createRef();
  refPasswordInput = React.createRef();
  refEmailInput = React.createRef();


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
    
    let {
      username,
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      phone_number,
      about,
      website_url,
      address,
      avatarFile
    } = this.state;

    // input checks
    let errorsOutput = [];
    const errorRefs = [
      this.refNameInput,
      this.refPasswordInput,
      this.refEmailInput
    ];
    let errors = [];
    if (
      !username || !username.trim() || username.trim().length > 25 ||
      !firstname || !firstname.trim() || firstname.trim().length > 25 ||
      !lastname || !lastname.trim() || lastname.trim().length > 25
      ) {
      errorsOutput.push("Names are required and must be within 25 characters max ");
      errors.push(0);
    }
    if (
      password.trim() !== confirmPassword.trim() ||
      !password || !password.trim() || password.trim().length > 50 ||
      !confirmPassword || !confirmPassword.trim() || confirmPassword.trim().length > 50
      ) {
      errorsOutput.push("Password and confirmation are required and need to be the same");
      errors.push(1);
    }
    const atSymbolIndex = email.indexOf('@');
    if (
      email.indexOf('@') !== email.lastIndexOf('@') ||
      !email.slice(atSymbolIndex).includes('.')
      ) {
      errorsOutput.push("Please enter a valid email");
      errors.push(2);
    };

    if (errorsOutput.length > 0) {
      console.log(errors)
      this.setState({ errorMsg: errorsOutput.join('\n') });
      errorRefs[errors[0]].current.focus();
    } else {

      // proceed with add request to server
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
  }


  render() {
    return (
      <div className="center-this">
        <h1 className='profile--name register-header'>Register Form</h1>
        <br />
        <Link to="/">
          Already have an account? Click here to login.
        </Link>
        <form className='registrationform' onSubmit={this.submitForm} encType="multipart/form-data">
          <div>
            <input
              type="text"
              placeholder="Username (required)"
              name="username"
              ref={this.refNameInput}
              onChange={this.handleInputs}
            />
            <input
              type="text"
              placeholder="Email (required)"
              name="email"
              ref={this.refEmailInput}
              onChange={this.handleInputs}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="First Name (required)"
              name="firstname"
              onChange={this.handleInputs}
            />
            <input
              type="text"
              placeholder="Last Name (required)"
              name="lastname"
              onChange={this.handleInputs}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Password (required)"
              name="password"
              ref={this.refPasswordInput}
              onChange={this.handleInputs}
            />
            <input
              type="text"
              placeholder="Confirm Password (required)"
              name="confirmPassword"
              onChange={this.handleInputs}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              onChange={this.handleInputs}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={this.handleInputs}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Bio"
              name="about"
              onChange={this.handleInputs}
            />
            <input
              type="text"
              placeholder="Website URL"
              name="website_url"
              onChange={this.handleInputs}
            />
          </div>

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
          {this.state.errorMsg ? this.state.errorMsg : ""}
        </p>
      </div>
    );
  }
}

export default RegisterForm;
