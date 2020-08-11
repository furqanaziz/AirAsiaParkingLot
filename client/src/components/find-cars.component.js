import React, { Component } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Cars = props => (
  <tr>
    <td>{props.slot.number}</td>
    <td>{props.slot.color}</td>
    <td>{props.slot.type}</td>
  </tr>
)

export default class FindCars extends Component {
  constructor(props) {
    super(props);

    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);

    this.state = {
      number: 0,
      type:'',
      cars: []
    }
  }

  getCarsByType(){
    axios.get(`http://localhost:8080/parking/car/type/${this.state.type}`,{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>{
      console.log(res.data)
      this.setState({ cars: res.data })
    }).catch((error) => {
        //toast('Slot Already Available. No car is Parked there.')
      // console.log(error);
    })
  }

  getCarsByNumber(){
    axios.get(`http://localhost:8080/parking/car/number/${this.state.number}`,{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res =>{
      console.log(res.data)
      this.setState({ cars: res.data })
    }).catch((error) => {
        //toast('Slot Already Available. No car is Parked there.')
    })
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
      number: ''
      }, () => {
      this.getCarsByType();
    });
  }

  onChangeNumber(e) {
    this.setState({
      number: e.target.value,
      type: ''
      }, () => {
      this.getCarsByNumber();
    });
  }

  carsList() {
    return this.state.cars.map(currentcar => {
      return <Cars slot={currentcar} key={currentcar.number}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Find Cars</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Car Type: </label>
            <input  type="text"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
              />
          </div>
          <div className="form-group"> 
          <label>Car Number: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.number}
              onChange={this.onChangeNumber}
              />
        </div>
        </form>
        { this.state.cars.length > 0 ?
          <div>
          <span className="row" style={{paddingLeft:'14px'}}><h3>Available Cars</h3>({this.state.cars.length})</span>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Number</th>
                <th>Color</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              { this.carsList() }
            </tbody>
          </table>
        </div>: null
        } 
      </div>
    )
  }
}