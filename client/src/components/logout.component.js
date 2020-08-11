import { Component } from 'react';

export default class Logout extends Component {
    constructor(props){
    super(props);

    localStorage.removeItem("token");
    window.location = '/'
    }

    render() {
        return null
    }
}