import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

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

    // const exercise = {
    //   username: this.state.username,
    //   description: this.state.description,
    //   duration: this.state.duration,
    //   date: this.state.date
    // }

    // console.log(exercise);

    // axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
    //   .then(res => console.log(res.data));

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
    </div>
    )
  }
}