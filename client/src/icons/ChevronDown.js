import React from 'react'

const ChevronDown = ({ color, size }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <path fill={color} d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>
)

export default ChevronDown;
