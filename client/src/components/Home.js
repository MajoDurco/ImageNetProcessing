import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { getSearchUrl } from '../utils'

import Node from './Node'

const Home = (props) => {
  const [inputText, onInputChange] = useState('')
  const [node, setNode] = useState({})
  const [isFetching, setFetchingStatus] = useState(true)

  const fetchData = async () => {
    const queryUrl = getSearchUrl({ parent: '' })
    const rootNode = await axios(queryUrl)
    if (rootNode.data.length)
      setNode(rootNode.data[0])
    setFetchingStatus(false)
  }

  const search = () => {
    const queryUrl = getSearchUrl({ text: inputText })
    props.history.push(queryUrl)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>home</h1>
      <form>
        <input type="text" onChange={(event) => onInputChange(event.target.value)}/>
        <button onClick={search}>
          Search
        </button>
      </form>
      { isFetching
        ? <div className="loader" />
        : <Node {...node} />
      }
    </div>
  )
}

export default Home
