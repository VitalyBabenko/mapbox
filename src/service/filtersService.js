import axiosInstance from './axiosInstance'

class Filters extends Array {
  constructor(...args) {
    super(...args)
    Object.setPrototypeOf(this, new.target.prototype)
  }

  getAccordions() {
    const accordions = Object.entries(
      this.reduce((acc, item) => {
        const key = item.category_title
        if (key === null) return acc
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(item)

        return acc
      }, {}),
    ).map(([category, items]) => ({
      title: category,
      filters: items,
    }))

    return accordions
  }

  getCheckboxes() {
    return this.filter(item => item.view === 'checkbox')
  }

  setInitialValues() {
    const params = new URLSearchParams(window.location.search)
    params.delete('showFilter')
    const paramsObj = Object.fromEntries(params.entries())

    const setEmptyValues = () => {
      this.forEach(filter => {
        switch (filter.view) {
          case 'input':
            filter.value = ''
            break

          case 'typeahead_input':
            filter.value = []
            break

          case 'multiple_dropdown':
            filter.value = []
            break

          case 'range':
            filter.value = [filter.values.min, filter.values.max]
            break

          case 'date_range':
            filter.value = { start: filter.values.min, end: filter.values.max }
            break

          case 'checkbox':
            filter.value = false
            break

          default:
            filter.value = ''
        }
      })

      return this
    }

    const setValueFromParams = () => {
      this.forEach(filter => {
        if (filter.view === 'input') {
          filter.value = paramsObj[`filters[${filter.id}]`] || ''
        }

        if (filter.view === 'typeahead_input') {
          filter.value = [{ label: paramsObj[`filters[${filter.id}]`] || '' }]
        }

        if (filter.view === 'multiple_dropdown') {
          const result = paramsObj[`filters[${filter.id}]`]
            ? {
                value: paramsObj[`filters[${filter.id}]`] || '',
                label: paramsObj[`filters[${filter.id}]`] || '',
              }
            : {
                value: paramsObj[`filters[${filter.id}][0]`] || '',
                label: paramsObj[`filters[${filter.id}][0]`] || '',
              }

          filter.value = result
        }

        if (filter.view === 'range') {
          filter.value = [
            paramsObj[`filters[${filter.id}][min]`] || filter?.values?.min || 0,
            paramsObj[`filters[${filter.id}][max]`] || filter?.values?.max || 0,
          ]
        }

        if (filter.view === 'date_range') {
          filter.value = {
            start:
              paramsObj[`filters[${filter.id}][min]`] ||
              filter?.values?.min ||
              0,
            end:
              paramsObj[`filters[${filter.id}][max]`] ||
              filter?.values?.max ||
              0,
          }
        }

        if (filter.view === 'checkbox') {
          filter.value = paramsObj[`filters[${filter.id}]`] === 'on'
        }
      })
    }

    params.size === 0 ? setEmptyValues() : setValueFromParams()
  }

  getValuesAsParams() {
    const result = {}

    this.forEach(filter => {
      if (filter.view === 'input') {
        const value = filter.value
        result[`filters[${filter.id}]`] = value
      }

      if (filter.view === 'typeahead_input') {
        const value = filter?.value?.[0]?.label || ''
        result[`filters[${filter.id}]`] = value
      }

      if (filter.view === 'multiple_dropdown') {
        const value = filter?.value?.label || ''
        result[`filters[${filter.id}][]`] = value
      }

      if (filter.view === 'checkbox') {
        const value = filter?.value === true ? '1' : '0'
        result[`filters[${filter.id}]`] = value
      }

      if (filter.view === 'range') {
        const min = filter?.value?.[0] || filter?.values?.min || '0'
        const max = filter?.value?.[1] || filter?.values?.max || ''
        result[`filters[${filter.id}][min]`] = min.toString()
        result[`filters[${filter.id}][max]`] = max.toString()
      }

      if (filter.view === 'date_range') {
        const start = filter?.value?.start || ''
        const end = filter?.value?.end || ''
        result[`filters[${filter.id}][min]`] = start
        result[`filters[${filter.id}][max]`] = end
      }
    })
    return result
  }
}

export const filterService = {
  fetchFilters: async function (filtersFor) {
    const allowedFiltersFor = ['plots', 'buildings', 'transactions']

    if (!allowedFiltersFor.includes(filtersFor)) {
      return { error: 'Invalid filtersFor argument' }
    }

    try {
      const lang = document.querySelector('html').lang
      const url = `/api/filters/${filtersFor}`
      const resp = await axiosInstance.get(url, { params: { lang } })
      const filters = new Filters(...resp.data.data)
      filters.setInitialValues()

      return filters
    } catch (err) {
      return { error: 'Filter service unavailable, try again later' }
    }
  },

  fetchResults: async function (filtersFor, filters, signal) {
    try {
      const acceptedFiltersFor = ['plots', 'buildings']

      if (!acceptedFiltersFor.includes(filtersFor)) {
        filtersFor = 'plots'
      }

      const params = filters.getValuesAsParams()
      const url = `/api/map/${filtersFor}`
      const { data } = await axiosInstance.get(url, {
        params,
        signal,
      })

      return data
    } catch (error) {
      return {
        error,
      }
    }
  },
}
