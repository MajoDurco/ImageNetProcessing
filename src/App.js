import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './components/Home'
import Search from './components/Search'
import Container from './components/Container'
import Center from './components/Center'

const App = () => (
  <Router>
    <Container>
      <Center>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          <h1>ImageNet</h1>
        </Link>
      </Center>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Search} />
    </Container>
  </Router>
)

export default App;
