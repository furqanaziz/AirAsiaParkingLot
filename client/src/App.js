import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom"

import Navbar from "./components/navbar.component"
import SlotsList from "./components/slots-list.component";
import UnParking from "./components/unparking.component";
import Parking from "./components/parking.component";
import FindCars from "./components/find-cars.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";


function App() {
  const isLoggedIn = localStorage.getItem('token') ? true : false;

    return (
      <Router>
          { !isLoggedIn ?
            <div className="container">
            <Route path="/" exact component={Login} />
            <Route path="/login" exact component={Login} />
            </div>
            : 
            <div className="container">
            <Navbar />
            <br/>
            <Route path="/" exact component={SlotsList} />
            <Route path="/unparking" component={UnParking} />
            <Route path="/parking" component={Parking} />
            <Route path="/findCars" component={FindCars} />
            <Route path="/logout" component={Logout} />
            </div>
          }     
      </Router>
      
    )
}

export default App;
