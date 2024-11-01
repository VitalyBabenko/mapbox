import { memo, useEffect, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import 'react-datepicker/dist/react-datepicker.css'
import { buildingService } from '../../../service/buildingService.js'
import { useFilterStore, useToastStore } from '../../../store'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.jsx'
import { getFilterAttributeValue } from '../../../utils/getFilterAttributeValue.js'
import FilterAccordion from '../../../components/Filters/FilterAccordion/FilterAccordion.jsx'
import Checkbox from '../../../components/Checkbox/Checkbox'

const BuildingsFilters = ({ setMapLoader }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [panelError, setPanelError] = useState('')
  const toast = useToastStore()
  const {
    checkboxes,
    setCheckboxes,
    allFilters,
    setAllFilters,
    accordions,
    setAccordions,
    formValues,
    setFormValues,
    setInputValue,
    setFilteredBuildingsFeatures,
  } = useFilterStore()

  const handleSubmit = async e => {
    e.preventDefault()
    setMapLoader(true)

    const formattedFilters = Object.keys(formValues).reduce((prev, next) => {
      const foundedFilter = allFilters.find(
        ({ attribute }) => attribute === next,
      )

      switch (foundedFilter.view) {
        case 'input': {
          if (formValues[next]) {
            prev[`filters[${foundedFilter.id}]`] = formValues[next]
          }
          break
        }

        case 'typeahead_input': {
          if (formValues[next].length) {
            prev[`filters[${foundedFilter.id}]`] = formValues[next]
              .map(({ label }) => label)
              .join(',')
          }
          break
        }

        case 'multiple_dropdown': {
          if (formValues[next]) {
            prev[`filters[${foundedFilter.id}][]`] = formValues[next].value
          }
          break
        }

        case 'range': {
          if (foundedFilter.values?.min !== formValues[next][0]) {
            prev[`filters[${foundedFilter.id}][min]`] = formValues[next][0] || 0
          }

          if (
            foundedFilter.values?.max !== formValues[next][1] &&
            formValues[next][1]
          ) {
            prev[`filters[${foundedFilter.id}][max]`] = formValues[next][1]
          }

          break
        }

        case 'date_range': {
          if (
            foundedFilter.values?.min !== formValues[next][0] &&
            formValues[next][0]
          ) {
            prev[`filters[${foundedFilter.id}][min]`] = formValues[next].start
          }

          if (
            foundedFilter.values?.max !== formValues[next][1] &&
            formValues[next][1]
          ) {
            prev[`filters[${foundedFilter.id}][max]`] = formValues[next].end
          }

          break
        }

        case 'checkbox': {
          if (formValues[next]) {
            prev[`filters[${foundedFilter.id}][]`] = formValues[next] ? 1 : 0
          }

          break
        }

        default:
          break
      }

      return prev
    }, {})

    const resp = await buildingService.setFilters(formattedFilters)
    if (resp?.error?.message) {
      toast.error("Une erreur s'est produite, réessayez plus tard")
      setMapLoader(false)
      return
    }
    if (!resp?.features?.length) {
      toast.text('Aucun bâtiment trouvé')
      setMapLoader(false)
      return
    }
    setFilteredBuildingsFeatures(resp.features)
    setMapLoader(false)
    toast.success(`${resp.features?.length} bâtiments trouvés`)
  }

  useEffect(() => {
    if (error.length && formValues.commune_name[0].label) {
      setError('')
    }
  }, [formValues])

  useEffect(() => {
    const getFilters = async () => {
      setIsLoading(true)
      const resp = await buildingService.getFilters()

      if (resp?.error?.message) {
        setPanelError(
          `Filtering service is unavailable, please try again later.`,
        )
        setIsLoading(false)
        return
      }
      setCheckboxes(resp.filters.filter(item => item.view === 'checkbox'))
      setAllFilters(resp.filters)
      setAccordions(resp.filtersByCategory)
      setFormValues(
        resp.filters.reduce((prev, next) => {
          prev[next.attribute] = getFilterAttributeValue(next.view, next.values)
          return prev
        }, {}),
      )
      setIsLoading(false)
    }

    getFilters()
  }, [])

  if (isLoading) return <Loader />
  if (panelError) return <ErrorMessage message={panelError} />

  return (
    <form onSubmit={handleSubmit}>
      {checkboxes.map(filter => (
        <Checkbox
          key={filter.id}
          label={filter.title}
          checked={formValues[filter.attribute]}
          onChange={e => setInputValue(filter.attribute, e.target.checked)}
        />
      ))}

      {accordions.map(accordion => (
        <FilterAccordion
          key={accordion.title}
          title={accordion.title}
          filters={accordion.filters}
          formValues={formValues}
          setInputValue={setInputValue}
        />
      ))}

      {error && <span role='alert'>{error}</span>}

      <div>
        <button type='submit'>Apply</button>
      </div>
    </form>
  )
}

export default memo(BuildingsFilters)
