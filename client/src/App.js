import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './components/Home'
import Search from './components/Search'

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
    </div>
  </Router>
)

export default App;
