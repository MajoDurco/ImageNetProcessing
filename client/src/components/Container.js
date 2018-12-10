import React from 'react'

const Container = (props) => (
  <div
    style={{
      width: '60%',
      margin: 'auto'
    }}
  >
    {props.children}
  </div>
)

export default Container
