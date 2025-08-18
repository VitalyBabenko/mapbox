import { useState } from 'react'
import styles from './Search.module.scss'
import { IoSearchSharp as SearchIcon } from 'react-icons/io5'

const Search = () => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = e => {
    setSearchValue(e.target.value)
  }

  const clearSearch = () => {
    setSearchValue('')
  }

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <input
        type='text'
        placeholder='Search by address...'
        value={searchValue}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {searchValue && (
        <button
          onClick={clearSearch}
          className={styles.clearSearchButton}
          aria-label='Clear search'
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Search
