import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from 'url'

import SearchNode from './SearchNode'

const Search = (props) => {
  const getSearchExpression = () => {
    const { query } = url.parse(props.location.search, true)
    return query.name
  }

  const [inputText, onInputChange] = useState(getSearchExpression())
  const [nodes, setNodes] = useState([])
  const [isFetching, setFetchingStatus] = useState(true)
  const [allFetched, setAllFetched] = useState(false)

  const getSearchResults = async () => {
    const queryUrl = url.format({
      protocol: 'http',
      hostname: 'localhost',
      pathname: 'search/',
      port: 8080,
      query: { name: getSearchExpression() }
    })
    const { data } = await axios(queryUrl)
    setNodes(data)
    setFetchingStatus(false)
  }

  useEffect(() => {
    getSearchResults()
  }, [])

  const onSearchClick = (event) => {
    event.preventDefault()
    const queryUrl = url.format({
      query: { name: inputText }
    })
    props.history.push(queryUrl)
    setFetchingStatus(true)
    setNodes([])
    getSearchResults()
  }

  const loadMore = async () => {
    const queryUrl = url.format({
      query: { name: inputText, lastId: nodes[nodes.length - 1]._id }
    })
    console.log(queryUrl)
    const { data } = await axios(queryUrl)
    if (nodes.length + data.length === nodes.length) setAllFetched(true)
    else setNodes([...nodes, ...data])
  }

  return (
    <div>
      <h1>search</h1>
      <form>
        <input type="text" value={inputText} onChange={(event) => onInputChange(event.target.value)}/>
        <button onClick={onSearchClick}>Search</button>
      </form>
      { isFetching
        ? <div className="loader" />
        : nodes.map((node) => <SearchNode key={node._id} {...node} />)
      }
      { Boolean(nodes.length) && !allFetched &&
        <button onClick={loadMore}>LoadMore</button>
      }
    </div>
  )
}

export default Search
