import style from './FilterAccordionValues.module.scss'

const FilterAccordionValues = ({ filters }) => {
  const isValueShowed = filter => {
    switch (filter.view) {
      case 'input':
        return !!filter.value.length

      case 'multiple_dropdown': {
        if (Array.isArray(filter.value)) return !!filter.value.length
        return !!filter.value?.label?.length
      }

      case 'typeahead_input':
        return !!filter.value?.[0]?.label

      case 'range':
        return !(
          filter.values.min?.toString() === filter.value[0]?.toString() &&
          filter.values.max?.toString() === filter.value[1]?.toString()
        )
      case 'date_range':
        return !(
          filter.values.min === filter.value.min &&
          filter.values.max === filter.value.max
        )
      default:
        return false
    }
  }

  const getFormattedInputValue = filter => {
    switch (filter.view) {
      case 'input':
        return filter.value
      case 'multiple_dropdown':
        return filter.value?.label
      case 'typeahead_input':
        return filter.value[0].label
      case 'range':
        return filter.value
          .map(val => val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
          .join(' - ')
      case 'date_range':
        return `${filter.value.min} - ${filter.value.max}`
      default:
        return null
    }
  }

  return (
    <ul className={style.filterValues}>
      {filters.map(filter =>
        isValueShowed(filter) ? (
          <li key={filter.id} className={style.filterItem}>
            <p className={style.filterTitle}>{filter.title}: </p>
            <span className={style.filterValue}>
              {getFormattedInputValue(filter)}
            </span>
          </li>
        ) : null,
      )}
    </ul>
  )
}

export default FilterAccordionValues
