import React, { Component } from 'react';

export default class Logout extends Component {
    constructor(props){
    super(props);

    localStorage.setItem("loggedIn", false)
    window.location = '/login'
    }

    render() {
        return null
    }
}