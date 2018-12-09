import React, { useState, useEffect } from 'react'
import axios from 'axios';
import url from 'url'

import Node from './Node'

const data = {
  "id": "5c0bd296f476ba3ff2720606",
  "name": "ImageNet 2011 Fall Release",
  "size": 60941,
  "children": [
    {
      "id": "5c0bd296f476ba3ff2720608",
      "name": "phytoplankton",
      "size": 2,
      "children": [
        {
          "id": "5c0bd296f476ba3ff2720609",
          "name": "planktonic algae",
          "size": 0
        },
        {
          "id": "5c0bd296f476ba3ff272060a",
          "name": "diatom",
          "size": 0
        }
      ]
    },
    {
      "id": "5c0bd296f476ba3ff272060b",
      "name": "microflora",
      "size": 0
    },
    {
      "id": "5c0bd296f476ba3ff272060c",
      "name": "crop",
      "size": 9,
      "children": [
        {
          "id": "5c0bd296f476ba3ff272060d",
          "name": "cash crop",
          "size": 0
        },
        {
          "id": "5c0bd296f476ba3ff272060e",
          "name": "catch crop",
          "size": 0
        },
        {
          "id": "5c0bd296f476ba3ff272060f",
          "name": "cover crop",
          "size": 0
        },
        {
          "id": "5c0bd296f476ba3ff2720610",
          "name": "field crop",
          "size": 4,
          "children": [
            {
              "id": "5c0bd296f476ba3ff2720611",
              "name": "field corn",
              "size": 3,
              "children": [
                {
                  "id": "5c0bd296f476ba3ff2720612",
                  "name": "dent corn, Zea mays indentata",
                  "size": 0
                },
                {
                  "id": "5c0bd296f476ba3ff2720613",
                  "name": "flint corn, flint maize, Yankee corn, Zea mays indurata",
                  "size": 0
                },
                {
                  "id": "5c0bd296f476ba3ff2720614",
                  "name": "soft corn, flour corn, squaw corn, Zea mays amylacea",
                  "size": 0
                }
              ]
            }
          ]
        },
        {
          "id": "5c0bd296f476ba3ff2720615",
          "name": "root crop",
          "size": 0
        }
      ]
    },
  ]
}

const Home = (props) => {

  const [inputText, onInputChange] = useState('')
  const [node, setNode] = useState({})
  const [isFetching, setFetchingStatus] = useState(true)

  const fetchData = async () => {
    const node = await axios('http://localhost:8080/')
    setNode(node.data)
    setFetchingStatus(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const search = () => {
    const queryUrl = url.format({
      pathname: 'search/',
      query: { text: inputText}
    })
    props.history.push(queryUrl)
  }

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