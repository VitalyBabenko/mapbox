import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { filterService } from '../../../service/filtersService'
import styles from './Search.module.scss'
import { IoSearchSharp as SearchIcon } from 'react-icons/io5'

const Search = () => {
  const [searchValue, setSearchValue] = useState([])
  const [searchOptions, setSearchOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchSearchOptions = async () => {
      setIsLoading(true)
      try {
        const filters = await filterService.fetchFilters('plots')
        if (!filters.error) {
          const searchFilter = filters.find(filter => filter.id === 14)
          if (searchFilter && searchFilter.values) {
            const options = searchFilter.values.map(value => ({
              label: value,
              value: value,
            }))
            setSearchOptions(options)
          }
        }
      } catch (error) {
        console.error('Error fetching search options:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchOptions()
  }, [])

  const handleSearchChange = selected => {
    setSearchValue(selected)
  }

  const clearSearch = () => {
    setSearchValue([])
  }

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <Typeahead
        id='header-search'
        onChange={handleSearchChange}
        options={searchOptions}
        selected={searchValue}
        maxResults={10}
        allowNew
        newSelectionPrefix=''
        placeholder='Search by address...'
        className={styles.searchTypeahead}
        isLoading={isLoading}
        minLength={1}
      />
      {searchValue.length > 0 && (
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
