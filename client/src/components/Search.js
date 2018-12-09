import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from 'url'

import SearchNode from './SearchNode'

const Search = (props) => {
  const getSearchExpression = () => {
    const { query } = url.parse(props.location.search, true)
    return query.text
  }

  const [inputText, onInputChange] = useState(getSearchExpression())
  const [nodes, setNodes] = useState([])
  const [isFetching, setFetchingStatus] = useState(true)


  const getSearchResults = async () => {
    const queryUrl = url.format({
      protocol: 'http',
      hostname: 'localhost',
      pathname: 'search/',
      port: 8080,
      query: { text: getSearchExpression() }
    })
    console.log(queryUrl)
    console.log('SEATCH')
    const { data } = await axios(queryUrl)
    setNodes(data)
    setFetchingStatus(false)
  }

  useEffect(() => {
    getSearchResults()
  }, [])

  const search = (event) => {
    event.preventDefault()
    const queryUrl = url.format({
      query: { text: inputText }
    })
    props.history.push(queryUrl)
    setFetchingStatus(true)
    setNodes([])
    getSearchResults()
  }

  return (
    <div>
      <h1>search</h1>
      <form>
        <input type="text" value={inputText} onChange={(event) => onInputChange(event.target.value)}/>
        <button onClick={search}>Search</button>
      </form>
      { isFetching
        ? <div className="loader" />
        : nodes.map((node) => <SearchNode key={node._id} {...node} />)
      }
    </div>
  )
}

export default Search
