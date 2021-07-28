import React from 'react';
import { Register, Login } from './components';
import { ToastContainer } from 'react-toastify';
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
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App;
