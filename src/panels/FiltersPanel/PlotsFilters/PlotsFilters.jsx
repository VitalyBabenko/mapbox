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

const PlotsFilters = ({ setMapLoader }) => {
  const { current: map } = useMap()
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState([])
  const [panelError, setPanelError] = useState('')
  const [error, setError] = useState('')
  const [formValues, setFormValues] = useState(null)
  const { switchToPlotsMode } = useModeStore()
  const { allCountiesFeatures, filteredPlotsIds, setFilteredPlotsIds } =
    useFilterStore()
  const toast = useToastStore()
  const [accordions, setAccordions] = useState({})

  const onChangeFormValue = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }))

    if (error.length && field === 'commune_name') setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formValues.commune_name.value) {
      setError('Veuillez sélectionner une commune')
      return
    }

    setMapLoader(true)

    const selectedCounty = await getCountyFeatureByName(
      formValues.commune_name.value,
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

    const allFilters = [...filters.list, ...filters.checkboxes]

    const formattedFilters = Object.keys(formValues).reduce((prev, next) => {
      const foundedFilter = allFilters.find(
        ({ attribute }) => attribute === next,
      )

      switch (foundedFilter.view) {
        case 'typeahead_input': {
          if (formValues[next].length) {
            prev[`filters[${foundedFilter.id}][]`] = formValues[next]
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
          prev[`filters[${foundedFilter.id}][]`] = formValues[next] ? 1 : 0

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
      return
    }
    if (!filtersResult?.length) {
      toast.text('Aucune parcelle trouvée')
      return
    }
    setFilteredPlotsIds(filtersResult)
    setMapLoader(false)
    toast.success(`${filtersResult?.length} parcelles trouvées`)
  }

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

      setFilters(resp.filters)
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
      {accordions.map(accordion => (
        <FilterAccordion
          key={accordion.title}
          title={accordion.title}
          filters={accordion.filters}
          formValues={formValues}
          onChangeFormValue={onChangeFormValue}
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
