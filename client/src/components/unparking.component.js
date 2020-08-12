import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';

export default class UnParking extends Component {
  constructor(props) {
    super(props);

    this.onChangeSlot = this.onChangeSlot.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      slot: 0,
    };
  }

  componentDidMount() {}

  onChangeSlot(e) {
    this.setState({
      slot: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    api
      .post(`/parking/unpark/${this.state.slot}`, '')
      .then((res) => {
        toast(`Car (${res.data.car.number}) is unparked against the slot id: ${this.state.slot}`);
      })
      .catch((error) => {
        toast('Slot Already Available. No car is Parked there.');
      });
  }

  render() {
    return (
      <div>
        <h3>UnPark Car</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Slot Number: </label>
            <input
              type="number"
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
        <ToastContainer />
      </div>
    );
  }
}
