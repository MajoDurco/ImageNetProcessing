import React, { useState } from 'react'

import ChevronDown from './icons/ChevronDown'
import ChevronLeft from './icons/ChevronLeft'

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

export default Node
