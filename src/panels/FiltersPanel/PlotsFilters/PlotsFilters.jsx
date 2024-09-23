import { memo, useEffect, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import { plotService } from '../../../service/plotService'
import { getFilterAttributeValue } from '../../../utils/getFilterAttributeValue'
import { getCountyFeatureByName } from '../../../utils/getCountyFeatureByName'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { useModeStore, useToastStore } from '../../../store'
import { useFilterStore } from '../../../store'
import bbox from '@turf/bbox'
import { useMap } from 'react-map-gl'
import FilterAccordion from '../../../components/Filters/FilterAccordion/FilterAccordion'
import Checkbox from '../../../components/Checkbox/Checkbox'

const PlotsFilters = ({ setMapLoader }) => {
  const { current: map } = useMap()
  const [isLoading, setIsLoading] = useState(true)
  const [panelError, setPanelError] = useState('')
  const [error, setError] = useState('')
  const { switchToPlotsMode } = useModeStore()
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
    allCountiesFeatures,
    filteredPlotsIds,
    setFilteredPlotsIds,
  } = useFilterStore()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formValues.commune_name[0].label) {
      setError('Veuillez sélectionner une commune')
      return
    }

    setMapLoader(true)

    const selectedCounty = await getCountyFeatureByName(
      formValues.commune_name?.[0]?.label,
      allCountiesFeatures,
    )

    const [minLng, minLat, maxLng, maxLat] = bbox(selectedCounty)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )
    switchToPlotsMode(selectedCounty)

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
            const result = []
            result[0] =
              formValues[next]?.value || formValues[next][0]?.label || ''
            prev[`filters[${foundedFilter.id}][]`] = result
          }
          break
        }

        case 'range': {
          prev[`filters[${foundedFilter.id}][min]`] = formValues[next][0] || 0

          if (formValues[next][1]) {
            prev[`filters[${foundedFilter.id}][max]`] = formValues[next][1]
          }

          break
        }

        case 'date_range': {
          prev[`filters[${foundedFilter.id}][min]`] = formValues[next].start
          prev[`filters[${foundedFilter.id}][max]`] = formValues[next].end
          break
        }

        case 'checkbox': {
          prev[`filters[${foundedFilter.id}]`] = formValues[next] ? 1 : 0

          break
        }

        default:
          break
      }

      return prev
    }, {})

    const filtersResult = await plotService.setFilters(formattedFilters)

    if (filtersResult?.error?.message) {
      toast.error("Une erreur s'est produite, réessayez plus tard")
      setMapLoader(false)
      return
    }
    if (!filtersResult?.length) {
      toast.text('Aucune parcelle trouvée')
      setMapLoader(false)
      return
    }

    setFilteredPlotsIds(filtersResult)
    setMapLoader(false)
    toast.success(`${filtersResult?.length} parcelles trouvées`)
  }

  useEffect(() => {
    if (error.length && formValues.commune_name[0]?.label) {
      setError('')
    }
  }, [formValues])

  useEffect(() => {
    const getFilters = async () => {
      setIsLoading(true)
      const resp = await plotService.getFilters()

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
        {filteredPlotsIds.length ? (
          <button onClick={() => setFilteredPlotsIds([])}>reset</button>
        ) : null}
      </div>
    </form>
  )
}

export default memo(PlotsFilters)
