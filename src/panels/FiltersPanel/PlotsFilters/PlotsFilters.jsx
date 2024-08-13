import { Fragment, memo, useEffect, useState } from 'react'
import Select from 'react-select'
import TypeaheadFilter from '../../../components/Filters/TypeaheadFilter/TypeaheadFilter'
import RangeFilter from '../../../components/Filters/RangeFilter/RangeFilter'
import Checkbox from '../../../components/Checkbox/Checkbox'
import Loader from '../../../components/Loader/Loader'
import { plotService } from '../../../service/plotService'
import { selectStyles } from '../../../styles/selectStyles'
import {
  TbMeterSquare as MeterSquareIcon,
  TbCurrencyEuro,
} from 'react-icons/tb'
import { getFilterAttributeValue } from '../../../utils/getFilterAttributeValue'
import DateFilter from '../../../components/Filters/DateFilter/DateFilter'
import { getCountyFeatureByName } from '../../../utils/getCountyFeatureByName'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { useModeStore, useToastStore } from '../../../store'
import { useFilterStore } from '../../../store'
import bbox from '@turf/bbox'
import { useMap } from 'react-map-gl'

const rangeIcons = {
  prix: <TbCurrencyEuro />,
  surface_parcelle_m2: <MeterSquareIcon />,
  age: null,
}

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

  const onChangeFormValue = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }))

    if (error.length && field === 'commune_name') setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMapLoader(true)

    if (!formValues.commune_name.value) {
      setError('Veuillez sélectionner une commune')
      return
    }

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

      setFilters(resp)
      setIsLoading(false)

      const preparedValues = [...resp.list, ...resp.checkboxes]

      setFormValues(
        preparedValues.reduce((prev, next) => {
          prev[next.attribute] = getFilterAttributeValue(next.view, next.values)
          return prev
        }, {}),
      )
    }

    getFilters()
  }, [])

  if (isLoading) return <Loader />
  if (panelError) return <ErrorMessage message={panelError} />

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {filters.checkboxes.map(filter => (
          <Checkbox
            key={filter.id}
            label={filter.title}
            checked={formValues[filter.attribute]}
            onChange={e => {
              onChangeFormValue(filter.attribute, e.target.checked)
            }}
          />
        ))}
      </div>

      {filters.list.map(filter => {
        switch (filter.view) {
          case 'typeahead_input':
            return (
              <TypeaheadFilter
                key={filter.attribute}
                filter={filter}
                value={formValues[filter.attribute]}
                setSelected={s => onChangeFormValue(filter.attribute, s)}
              />
            )

          case 'multiple_dropdown':
            return (
              <Fragment key={filter.attribute}>
                <h3>{filter.title}</h3>

                <Select
                  name={filter.attribute}
                  styles={selectStyles}
                  value={formValues[filter.attribute]}
                  onChange={newValue =>
                    onChangeFormValue(filter.attribute, newValue)
                  }
                  options={filter.values.map(v => ({
                    value: v,
                    label: v,
                  }))}
                />
              </Fragment>
            )

          case 'range':
            return (
              <Fragment key={filter.attribute}>
                <RangeFilter
                  label={filter.title}
                  icon={rangeIcons[filter.attribute]}
                  min={filter.values.min || 0}
                  max={filter.values.max || 0}
                  value={formValues[filter.attribute]}
                  setValue={v => onChangeFormValue(filter.attribute, v)}
                />
              </Fragment>
            )

          case 'date_range':
            return (
              <Fragment key={filter.attribute}>
                <DateFilter
                  key={filter.attribute}
                  label={filter.title}
                  startValue={formValues[filter.attribute]?.start}
                  setStartValue={v => onChangeFormValue(filter.attribute, v)}
                  endValue={formValues[filter.attribute]?.end}
                  setEndValue={v => onChangeFormValue(filter.attribute, v)}
                />
              </Fragment>
            )
          default:
            return null
        }
      })}

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
