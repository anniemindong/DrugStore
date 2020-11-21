import React, { Component } from 'react';
// import { config } from '../Constants'
// const bcrypt = require('bcrypt');

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.username,
      password: this.state.password
    };
    axios
      .post("http://localhost:4000/api/stores/login", userData)
      .then(res => {
        // Save to localStorage
        console.log(res)
        // Set token to localStorage
        const { token } = res.data;
        const storeUserName = res.data.name;
        console.log(storeUserName)
  
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("storeUserName", storeUserName)
                // Set token to Auth header
        setAuthToken(token);
        // Decode token to get store data
        const decoded = jwt_decode(token);
        // Set current store
        // setCurrentUser(decoded);
        this.props.history.push('/list');
      })
      // .catch(err =>
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // })
      // );


    // bcrypt.hash(this.state.password, 10, function(err, hashedPassword) {
    // var hashedPassword = this.state.password;
    //     fetch(config.url.API_URL + '/api/login', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: this.state.username,
    //             password: hashedPassword
    //         }),
    //         headers: {
    //         'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(res => {
    //         if (res.status === 200) {
    //         this.props.history.push('/');
    //         } else {
    //         const error = new Error(res.error);
    //         throw error;
    //         }
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         alert('Error logging in please try again');
    //     });
    // });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <input
          type="username"
          name="username"
          placeholder="Enter email"
          value={this.state.username}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={this.state.password}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
