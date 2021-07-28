import React from 'react';
import { Register, Login, Home } from './components';
import { ToastContainer } from 'react-toastify';
import Producted from './components/Producted';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Producted exact path="/home" component={Home} />
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App;
