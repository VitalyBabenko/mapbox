import { memo, useEffect, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import 'react-datepicker/dist/react-datepicker.css'
import { getCountyFeatureByName } from '../../../utils/getCountyFeatureByName.js'
import { buildingService } from '../../../service/buildingService.js'
import { useFilterStore, useModeStore, useToastStore } from '../../../store'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage.jsx'
import { getFilterAttributeValue } from '../../../utils/getFilterAttributeValue.js'
import { useMap } from 'react-map-gl'
import bbox from '@turf/bbox'
import FilterAccordion from '../../../components/Filters/FilterAccordion/FilterAccordion.jsx'
import Checkbox from '../../../components/Checkbox/Checkbox'

const BuildingsFilters = ({ setMapLoader }) => {
  const { current: map } = useMap()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [panelError, setPanelError] = useState('')
  const { switchToBuildingsMode } = useModeStore()
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
    filteredBuildingsIds,
    setFilteredBuildingsIds,
  } = useFilterStore()

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formValues.commune_name?.[0]?.label) {
      setError('Veuillez sélectionner une commune')
      return
    }

    setMapLoader(true)

    const selectedCounty = getCountyFeatureByName(
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

    switchToBuildingsMode(selectedCounty)

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

    const filtersResult = await buildingService.setFilters(formattedFilters)

    if (filtersResult?.error?.message) {
      toast.error("Une erreur s'est produite, réessayez plus tard")
      setMapLoader(false)
      return
    }

    if (!filtersResult?.length) {
      toast.text('Aucun bâtiment trouvé')
      setMapLoader(false)
      return
    }

    setFilteredBuildingsIds(filtersResult)
    setMapLoader(false)
    toast.success(`${filtersResult?.length} bâtiments trouvés`)
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
        {filteredBuildingsIds.length ? (
          <button onClick={() => setFilteredBuildingsIds([])}>Reset</button>
        ) : null}
      </div>
    </form>
  )
}

export default memo(BuildingsFilters)
