import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Parking Stats
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/parking" className="nav-link">
                Car Parking
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/unparking" className="nav-link">
                Car Unparking
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/findCars" className="nav-link">
                Find Cars
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/logout" className="nav-link">
                LogOut
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
