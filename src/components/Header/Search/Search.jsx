import { useState, useEffect } from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import { filterService } from '@/service/filtersService'
import { useFilterStore, useModeStore, useToastStore } from '@/store'
import { useLocale } from '@/hooks'
import styles from './Search.module.scss'
import { IoSearchSharp as SearchIcon } from 'react-icons/io5'
import { MODES } from '@/constants'

const Search = () => {
  const [searchValue, setSearchValue] = useState([])
  const [searchOptions, setSearchOptions] = useState([])

  const { setFiltersResult } = useFilterStore()
  const toast = useToastStore()
  const { toggleSwitcher, switchToCountiesMode } = useModeStore()
  const { t } = useLocale('panels.filters')

  useEffect(() => {
    const fetchSearchOptions = async () => {
      try {
        const filters = await filterService.fetchFilters('plots')
        if (!filters.error) {
          const searchFilter = filters.find(
            filter => filter.attribute === 'condensed_address',
          )
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
      }
    }

    fetchSearchOptions()
  }, [])

  const handleSearchChange = async selected => {
    setSearchValue(selected)

    if (selected && selected.length > 0) {
      switchToCountiesMode([])
      toggleSwitcher(MODES.PLOTS)
      await performSearch(selected[0].label)
    }
  }

  const performSearch = async address => {
    try {
      const resp = await filterService.fetchResults('plots', {
        getValuesAsParams: () => ({ 'filters[14]': address }),
        length: 1,
      })

      if (resp?.error) {
        toast.error(t('toast.error'))
      } else {
        setFiltersResult(resp?.features)
        toast.success(
          t('toast.success', { count: resp?.features?.length || 0 }),
        )
      }
    } catch (err) {
      console.error('Search error:', err)
      toast.error(t('toast.error'))
    }
  }

  const clearSearch = () => {
    setSearchValue([])
    setFiltersResult([])
    switchToCountiesMode([])
  }

  return (
    <div className={styles.searchContainer}>
      <SearchIcon className={styles.searchIcon} />
      <Typeahead
        id='header-search'
        onChange={handleSearchChange}
        options={searchOptions}
        selected={searchValue}
        maxResults={20}
        allowNew
        newSelectionPrefix='Other: '
        placeholder='Search by address...'
        className={styles.searchTypeahead}
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
