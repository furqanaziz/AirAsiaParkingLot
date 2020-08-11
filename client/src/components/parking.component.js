import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Parking extends Component {
  constructor(props) {
    super(props);

    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      number: '',
      type: '',
      color: '',
    }
  }

  componentDidMount() {
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }

  onChangeColor(e) {
    this.setState({
      color: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    const parking = {
      number: this.state.number,
      color: this.state.color,
      type: this.state.type
    }
    console.log(parking);

    axios.post('http://localhost:8080/parking/park', parking,{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>{
      console.log(res.data)
      toast(`Car (${this.state.number}) is parked against the slot id: ${res.data.id}`);
    })
      .catch((error) => {
        toast('Car Already Parked')
    })
  }

  render() {
    return (
    <div>
      <h3>Park New Car</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Number: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.number}
              onChange={this.onChangeNumber}
              />
        </div>
        <div className="form-group"> 
          <label>Type: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
              />
        </div>
        <div className="form-group">
          <label>Color: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.color}
              onChange={this.onChangeColor}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Park New Car" className="btn btn-primary" />
        </div>
      </form>
      <ToastContainer/>
    </div>
    )
  }
}