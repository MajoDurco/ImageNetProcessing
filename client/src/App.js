import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [nodes, setNodes ] = useState({})

  const fetchData = async () => {
    const nodes = await axios('http://localhost:8080/')
    console.log(nodes.data)
    setNodes(nodes.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App;
