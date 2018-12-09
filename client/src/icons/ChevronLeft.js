import React from 'react'

const ChevronLeft = ({ color, size }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
    <path fill={color} d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </svg>
)

export default ChevronLeft