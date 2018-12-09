import React from 'react'

const SearchResultNode = ({ name, size }) => {

  const getPath = () => name.split(' > ')
  const getName = () => {
    const namePath = getPath()
    return namePath.length > 1
      ? namePath[namePath.length - 1]
      : ''
  }

  return (
    <div>
      <div>
        Name: {getName()}
      </div>
      <div>
        Path: { getPath().map((pathPart) => (
          <span
            key={pathPart}>/{pathPart}
          </span>
        ))}
      </div>
      <div>
        Size: {size}
      </div>
    </div>
  )
}

export default SearchResultNode
