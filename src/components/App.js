import React, { Fragment }  from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Home from './Home'
import Signin from './Signin'
import Signup from './Signup'
import Checkout from './Checkout'
import Navegation from './Navegation'
import Brews from './Brews'

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  return (
    <Router>
      <Fragment>
        <Navegation />
        <div className="container-fluid p-4">
            <Switch>
              <Route exact component={Home} path="/" />
              <Route component={Signin} path="/signin" />
              <Route component={Signup} path="/signup" />
              <Route component={Checkout} path="/checkout" />
              <Route component={Brews} path="/:brandId" />
            </Switch>
          </div>
      </Fragment>
    </Router>
  );
}

export default App;
