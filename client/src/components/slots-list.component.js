import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Slots = props => (
  <tr>
    <td>{props.slot.id}</td>
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
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYW1hYXJoYXNzYW5jc0BnbWFpbC5jb20ifSwiaWF0IjoxNTk3MDYzNzQwLCJleHAiOjE1OTczMjI5NDB9.9GbR6qXuWZYkTKkMPm2IfC0Oj302vSYmJNk2UvElBGU`
      }
    }).then(response => {
        this.setState({ slots: response })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  slotsList() {
    return this.state.slots.map(currentslot => {
      return <Slots slot={currentslot} key={currentslot.id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Available Slots</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Slot Id</th>
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