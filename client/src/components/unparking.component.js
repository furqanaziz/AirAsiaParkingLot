import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class UnParking extends Component {
  constructor(props) {
    super(props);

    this.onChangeSlot = this.onChangeSlot.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      slot: 0,
    }
  }

  componentDidMount() {

  }

  onChangeSlot(e) {
    this.setState({
      slot: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);

    axios.post(`http://localhost:8080/parking/unpark/${this.state.slot}`, '',{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>{
      console.log(res.data)
      toast(`Car (${res.data.car.number}) is unparked against the slot id: ${this.state.slot}`);
    })
      .catch((error) => {
        toast('Slot Already Available. No car is Parked there.')
      // console.log(error);
    })

    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>UnPark Car</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Slot Number: </label>
          <input  type="number"
              required
              className="form-control"
              value={this.state.slot}
              onChange={this.onChangeSlot}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="UnPark Car" className="btn btn-primary" />
        </div>
      </form>
      <ToastContainer/>
    </div>
    )
  }
}