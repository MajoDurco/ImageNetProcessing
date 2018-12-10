import React, { useState } from 'react'
import axios from 'axios';

import { getSearchUrl, getNodeName } from '../utils'

import ChevronDown from './icons/ChevronDown'
import ChevronLeft from './icons/ChevronLeft'

const style = {
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
}

const Node = ({ name, size }) => {
  const [children, setChildren] = useState([])
  const [expanded, toggleExpand] = useState(false)
  const [dataFetched, setFetched] = useState(false)
  const [isFetching, setFetchingStatus] = useState(false)

  const fetchData = async () => {
    setFetchingStatus(true)
    const queryUrl = getSearchUrl({ parent: name })
    const childrenNodes = await axios(queryUrl)
    setChildren(childrenNodes.data)
    setFetchingStatus(false)
  }

  const onExpand = () => {
    if(!dataFetched && size) {
      setFetched(true)
      fetchData()
    }
    toggleExpand(!expanded)
  }

  return (
    <div style={{ paddingLeft: '20px'}}>
      <div onClick={onExpand} style={style.titleWrapper}>
        <span style={{ visibility: size ? 'visible' : 'hidden' }}>
          {
            expanded
              ? <ChevronDown color="black" size={20} />
              : <ChevronLeft color="black" size={20} />
          }
        </span>
        { getNodeName(name) } ({ size })
      </div>
      { isFetching
        ? (
          <div style={{ paddingLeft: '20px' }}>
            <div className="loader" />
          </div>
        )
        : Boolean(size) && children && expanded && children.map((child) => <Node key={child._id} {...child} />)
      }
    </div>
  )
}

export default Node
