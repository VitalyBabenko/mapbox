import style from './FilterAccordionValues.module.scss'

const FilterAccordionValues = ({ filters, formValues }) => {
  const isValueShowed = filter => {
    const filterValue = formValues[filter.attribute]

    switch (filter.view) {
      case 'input':
        return !!filterValue.length

      case 'multiple_dropdown': {
        if (Array.isArray(filterValue)) return !!filterValue.length
        return !!filterValue?.label?.length
      }

      case 'typeahead_input':
        return !!filterValue?.[0]?.label

      case 'range':
        return !(
          filter.values.min === filterValue[0] ||
          filter.values.max === filterValue[1]
        )
      default:
        return false
    }
  }

  const getFormattedInputValue = filter => {
    const filterValue = formValues[filter.attribute]

    switch (filter.view) {
      case 'input':
        return filterValue
      case 'multiple_dropdown':
        return filterValue?.label
      case 'typeahead_input':
        return filterValue[0].label
      case 'range':
        return filterValue.join(' - ')
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
