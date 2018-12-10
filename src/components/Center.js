import React from 'react'

const Container = (props) => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      ...props.style,
    }}
  >
    {props.children}
  </div>
)

export default Container
