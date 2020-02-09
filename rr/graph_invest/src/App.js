import React, { Component } from 'react'
import './App.css'
import Graph from './Graph'
import Home from './Home'
import Nav from './Nav'
import Details from './Details'
import piechart from './piechart'
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom'

class App extends Component {
   render() {
   return (
     <Router>
      <div>
      <Nav />
      <Switch>
          <Route path="/graph" component={Graph} />
          <Route path="/details" component={Details} />
          <Route path="/piechart" component={piechart} />
          <Route path="/" exact component={Home} />
      </Switch>   
      </div>
      </Router>
   )
   }
}

export default App
