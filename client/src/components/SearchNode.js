import React from 'react'

const styles = {
  key: {
    fontWeight: '800',
    fontSize: '1em',
  },
  node: {
    padding: '5px',
    borderBottom: '1px solid black'
  }
}

const SearchResultNode = ({ name, size }) => {

  const getPath = () => name.split(' > ')
  const getName = () => {
    const namePath = getPath()
    return namePath.length > 1
      ? namePath[namePath.length - 1]
      : ''
  }

  return (
    <div style={styles.node}>
      <div>
        <span style={styles.key}>Name: </span>
        {getName()}
      </div>
      <div>
        <span style={styles.key}>Path: </span>
        { getPath().map((pathPart) => (
          <span
            key={pathPart}>/{pathPart}
          </span>
        ))}
      </div>
      <div>
        <span style={styles.key}>Size: </span>
        {size}
      </div>
    </div>
  )
}

export default SearchResultNode
