import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

export const login= async (state) => {
  return await api.post(`/auth/login`, state)
}

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit(event) {
    event.preventDefault();

      login(this.state)
      .then((res) => {
        if (res.data) {
          console.log(res);
          localStorage.setItem('token', res.data.tokens.token);
          window.location = '/';
        }
      })
      .catch((error) => {
        toast('Invalid Credentials');
        //console.error(error.data.error);
      });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.onChangePassword}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            className="primary"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <ToastContainer />
      </div>
    );
  }
}
