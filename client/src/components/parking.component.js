import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class Parking extends Component {
  constructor(props) {
    super(props);

    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    //this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      number: 0,
      type: '',
      color: '',
    }
  }

  componentDidMount() {
    // axios.get('http://localhost:5000/users/')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username),
    //         username: response.data[0].username
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

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
    // const exercise = {
    //   // username: this.state.username,
    //   // description: this.state.description,
    //   // duration: this.state.duration,
    //   // date: this.state.date
    // }

    // console.log(exercise);

    // axios.post('http://localhost:5000/exercises/add', exercise)
    //   .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Park New Car</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Number: </label>
          <input  type="number"
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
        {/* <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div> */}

        <div className="form-group">
          <input type="submit" value="Park New Car" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}