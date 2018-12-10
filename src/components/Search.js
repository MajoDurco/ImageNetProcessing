import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from 'url'

import SearchNode from './SearchNode'
import SearchBar from './SearchBar'
import Center from './Center'
import { getBackendSearchUrl } from '../utils'

const styles = {
  loadMoreButton: {
    background: 'none',
    border: '2px black solid',
    borderRadius: '5px',
    fontSize: '1.5em',
    fontWidth: '800',
    padding: '10px'
  }
}

const Search = (props) => {
  const getSearchExpression = () => {
    const { query } = url.parse(props.location.search, true)
    return query.name
  }

  const [inputText, onInputChange] = useState(getSearchExpression())
  const [nodes, setNodes] = useState([])
  const [isFetching, setFetchingStatus] = useState(true)
  const [allFetched, setAllFetched] = useState(true)

  const getSearchResults = async () => {
    const queryUrl = getBackendSearchUrl({ name: getSearchExpression() })
    const limit = 50;
    const { data } = await axios(queryUrl)
    if (data.length === limit) setAllFetched(false)
    setNodes(data)
    setFetchingStatus(false)
  }

  useEffect(() => {
    getSearchResults()
    onInputChange(getSearchExpression())
    setFetchingStatus(true)
    setAllFetched(true)
  }, [props.history.location.search])

  const onSearchClick = () => {
    const queryUrl = url.format({
      query: { name: inputText }
    })
    props.history.push(queryUrl)
  }

  const loadMore = async () => {
    const queryUrl = getBackendSearchUrl({ name: inputText, lastId: nodes[nodes.length - 1]._id })
    const { data } = await axios(queryUrl)
    if (nodes.length + data.length === nodes.length) setAllFetched(true)
    else setNodes([...nodes, ...data])
  }

  return (
    <div>
      <Center>
        <SearchBar value={inputText} onChange={onInputChange} onSearch={onSearchClick} />
      </Center>
      <div style={{ paddingTop: '20px' }}>
        { isFetching
          ? (
            <Center>
              <div className="loader" />
            </Center>
          )
          : nodes.map((node) => <SearchNode key={node._id} {...node} />)
        }
      </div>
      { Boolean(nodes.length) && !allFetched &&
        <Center style={{ padding: '20px' }}>
          <button style={styles.loadMoreButton} onClick={loadMore}>LoadMore</button>
        </Center>
      }
    </div>
  )
}

export default Search
