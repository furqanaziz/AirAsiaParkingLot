import React, { Component } from 'react';
import axios from 'axios';

export default class FindCars extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      types: ['Sedan', 'Suv'],
      number: 0
    }
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      username: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Find Cars</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Car Type: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}>
              {
                this.state.types.map(function(type) {
                  return <option 
                    key={type}
                    value={type}>{type}
                    </option>;
                })
              }
          </select>
          </div>
          <div className="form-group"> 
          <label>Car Number: </label>
          <input  type="number"
              required
              className="form-control"
              value={this.state.number}
              onChange={this.onChangeNumber}
              />
        </div>
          <div className="form-group">
            <input type="submit" value="Find Cars" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}