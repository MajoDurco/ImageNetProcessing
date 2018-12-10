import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { getSearchUrl } from '../utils'

import Node from './Node'
import SearchBar from './SearchBar'
import Center from './Center'

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
    const queryUrl = getSearchUrl({ name: inputText })
    props.history.push(queryUrl)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Center>
        <SearchBar value={inputText} onChange={onInputChange} onSearch={search} />
      </Center>
      { isFetching
        ? <div className="loader" />
        : <Node {...node} />
      }
    </div>
  )
}

export default Home
