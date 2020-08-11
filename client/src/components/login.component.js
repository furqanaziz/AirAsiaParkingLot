import React, { Component } from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Login extends Component {
    constructor(props){
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


    this.state={
    email:'',
    password:''
    }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit(event) {
      event.preventDefault();

      axios.post('http://localhost:8080/auth/login', this.state,{
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
        }).then(res =>{
          console.log(res.data)
          if(res.data){
            localStorage.setItem('token', res.data.tokens.token)
            window.location = '/'
          }
        })
          .catch((error) => {
            toast('Invalid Credentials')
          //console.log(error.data.error);
      })
    }

    onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        })
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
            <Button block bsSize="large" className="primary" disabled={!this.validateForm()} type="submit">
              Login
            </Button>
          </form>
          <ToastContainer/>
        </div>
      );
  }
}
