export const getInitialFiltersValue = (params, filters, values) => {
  const paramsObj = {}
  for (const [key, value] of params.entries()) {
    if (key === 'showFilter') continue
    paramsObj[key] = value
  }

  const result = Object.keys(paramsObj).reduce((acc, paramKey) => {
    const filterId = ((m = paramKey.match(/\[(\d+)\]/)) => (m ? +m[1] : null))()
    const currentFilter = filters.find(filter => filter.id === filterId)
    if (!currentFilter) return acc

    if (currentFilter.view === 'multiple_dropdown') {
      acc[currentFilter.attribute] = {
        value: paramsObj[paramKey],
        label: paramsObj[paramKey],
      }
      return acc
    }

    if (currentFilter.view === 'typeahead_input') {
      acc[currentFilter.attribute] = [{ label: paramsObj[paramKey] }]
      return acc
    }

    if (currentFilter.view === 'input') {
      acc[currentFilter.attribute] = paramsObj[paramKey]
      return acc
    }

    if (currentFilter.view === 'range') {
      acc[currentFilter.attribute] = [
        paramsObj['filters[' + filterId + '][min]'],
        paramsObj['filters[' + filterId + '][max]'],
      ]
      return acc
    }
    return acc
  }, {})

  return {
    ...values,
    ...result,
  }
}
