import React, { useState, useEffect } from 'react'
import axios from 'axios';

import ChevronDown from './icons/ChevronDown'
import ChevronLeft from './icons/ChevronLeft'

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

const Node = ({ name, children, size }) => {

  const [expanded, toggleExpand] = useState(false)

  return (
    <div style={{ paddingLeft: '15px'}}>
      <div onClick={() => toggleExpand(!expanded)}>
        <span style={{ visibility: size ? 'visible' : 'hidden' }}>
          {
            expanded
              ? <ChevronDown color="black" size={20} />
              : <ChevronLeft color="black" size={20} />
          }
        </span>
        Name: { name }
      </div>
      { children && expanded &&
        children.map((child) => <Node key={child.id} {...child} />)
      }
    </div>
  )
}

const App = () => {

  const [node, setNode ] = useState({})

  const fetchData = async () => {
    // const node = await axios('http://localhost:8080/')
    const node = { data }
    setNode(node.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      { Boolean(Object.keys(node).length) &&
        <Node {...node} />
      }
    </div>
  )
}

export default App;
