export const getFilterAttributeValue = (view, values) => {
  switch (view) {
    case 'input': {
      return ''
    }

    case 'typeahead_input': {
      return ''
    }

    case 'multiple_dropdown': {
      return []
    }

    case 'range': {
      return [values.min, values.max]
    }

    case 'date_range': {
      return { start: values.min, end: values.max }
    }

    case 'checkbox': {
      return false
    }

    default:
      return null
  }
}
