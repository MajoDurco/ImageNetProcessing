import React from 'react'

const styles = {
  searchContainer: {
    border: '2px black solid',
    borderRadius: '5px',
    display: 'flex',
  },
  inputBar: {
    border: 'none',
    fontSize: '1.5em',
    fontWidth: '800',
    height: '40px',
    margin: '1px',
    minWidth: '300px',
    outline: 'none',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  searchButton: {
    background: 'none',
    border: 'none',
    borderLeft: '2px black solid',
    fontSize: '1.5em',
    fontWidth: '800',
  }
}

const SearchBar = (props) => {

  const onClick = (event) => {
    event.preventDefault()
    props.onSearch()
  }

  return (
    <form>
      <div style={styles.searchContainer}>
        <input
          onChange={(event) => props.onChange(event.target.value)}
          placeholder="Search for name"
          style={styles.inputBar}
          type="text"
          value={props.value}
        />
        <button
          style={styles.searchButton}
          onClick={onClick}>
            Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
