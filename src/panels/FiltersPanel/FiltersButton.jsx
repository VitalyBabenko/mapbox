import { memo } from 'react'
import { IoFilter as FilterIcon } from 'react-icons/io5'
import style from './FiltersButton.module.scss'

const FiltersButton = ({ onClick, className = '', buttonPosition = { top: 49, left: 10 } }) => {
  return (
    <button
      className={`${style.filtersButton} ${className}`}
      onClick={onClick}
      title='Filters'
      style={buttonPosition}
    >
      <FilterIcon size={19} />
      Filters
    </button>
  )
}

export default memo(FiltersButton)
