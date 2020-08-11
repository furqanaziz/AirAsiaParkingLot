import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Slots = props => (
  <tr>
    <td>{props.slot.id}</td>
    <td>{props.slot.car}</td>
    <td>{props.slot.alloted}</td>
  </tr>
)

export default class SlotsList extends Component {
  constructor(props) {
    super(props);

    this.state = {slots: []};
  }

  componentDidMount() {
    axios.get('http://localhost:8080/parking/available',{
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
        console.log(response);
        this.setState({ slots: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  slotsList() {
    return this.state.slots.map(currentslot => {
      currentslot.alloted = currentslot.alloted ? 'YES' : 'NO';
      currentslot.car = '---'
      return <Slots slot={currentslot} key={currentslot.id}/>;
    })
  }

  render() {
    return (
      <div>
        <span className="row" style={{paddingLeft:'14px'}}><h3>Available Parking Slots</h3>({this.state.slots.length})</span>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Slot Id</th>
              <th>Car</th>
              <th>Alloted</th>
            </tr>
          </thead>
          <tbody>
            { this.slotsList() }
          </tbody>
        </table>
      </div>
    )
  }
}