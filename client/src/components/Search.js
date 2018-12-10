import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from 'url'

import SearchNode from './SearchNode'
import SearchBar from './SearchBar'
import Center from './Center'

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
    const limit = 50;
    const { data } = await axios(queryUrl)
    if (data.length < limit) setAllFetched(true)
    setNodes(data)
    setFetchingStatus(false)
  }

  useEffect(() => {
    getSearchResults()
  }, [props.history.location.search])

  const onSearchClick = () => {
    const queryUrl = url.format({
      query: { name: inputText }
    })
    props.history.push(queryUrl)
  }

  const loadMore = async () => {
    const queryUrl = url.format({
      query: { name: inputText, lastId: nodes[nodes.length - 1]._id }
    })
    const { data } = await axios(queryUrl)
    if (nodes.length + data.length === nodes.length) setAllFetched(true)
    else setNodes([...nodes, ...data])
  }

  return (
    <div>
      <Center>
        <SearchBar value={inputText} onChange={onInputChange} onSearch={onSearchClick} />
      </Center>
      { isFetching
        ? (
          <Center style={{ paddingTop: '20px' }}>
            <div className="loader" />
          </Center>
        )
        : nodes.map((node) => <SearchNode key={node._id} {...node} />)
      }
      { Boolean(nodes.length) && !allFetched &&
        <button onClick={loadMore}>LoadMore</button>
      }
    </div>
  )
}

export default Search
