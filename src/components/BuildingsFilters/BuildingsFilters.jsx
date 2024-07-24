import { Fragment, memo, useEffect, useState } from 'react'
import { selectStyles } from '../../styles/selectStyles'
import Loader from '../Loader/Loader.jsx'
import style from './BuildingsFilter.module.scss'

import { IoFilter as FilterIcon } from 'react-icons/io5'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import {
  TbMeterSquare as MeterSquareIcon,
  TbCurrencyEuro,
} from 'react-icons/tb'
import { filterService } from '../../service/filterService.js'
import RangeFilter from '../Filters/RangeFilter/RangeFilter.jsx'
import DateFilter from '../Filters/DateFilter/DateFilter.jsx'

import TypeaheadFilter from '../Filters/TypeaheadFilter/TypeaheadFilter.jsx'
import Checkbox from '../Checkbox/Checkbox.jsx'
import { getCountyFeatureByName } from '../../utils/getCountyFeatureByName.js'

const rangeIcons = {
  prix: <TbCurrencyEuro />,
  surface_parcelle_m2: <MeterSquareIcon />,
  age: null,
}

const PlotsFilters = memo(
  ({ onSetFilters, setCounty, setBuilding, allCountiesFeatures }) => {
    const [open, setOpen] = useState(false)
    const [filters, setFilters] = useState([])
    const [formValues, setFormValues] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const toggleOpen = () => setOpen(!open)

    const handleSubmit = async e => {
      e.preventDefault()

      if (!formValues.commune_name.value) {
        setError('Veuillez sélectionner une commune')
        return
      }
      setBuilding(null)
      onSetFilters([])

      const selectedCounty = getCountyFeatureByName(
        formValues.commune_name.value,
        allCountiesFeatures,
      )

      setCounty(selectedCounty)

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
            if (foundedFilter.values?.min !== formValues[next][0]) {
              prev[`filters[${foundedFilter.id}][min]`] =
                formValues[next][0] || 0
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

      const newFilters = await filterService.setBuildingsFilters(
        formattedFilters,
      )
      onSetFilters(newFilters)
    }

    const onChangeFormValue = (field, value) => {
      setFormValues(prev => ({ ...prev, [field]: value }))
    }

    useEffect(() => {
      const getFilters = async () => {
        setIsLoading(true)
        const resp = await filterService.getBuildingsFilters()
        setFilters(resp)
        setIsLoading(false)

        const preparedValues = [...resp.list, ...resp.checkboxes]

        const getAttributeValue = (view, values) => {
          switch (view) {
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

        setFormValues(
          preparedValues.reduce((prev, next) => {
            prev[next.attribute] = getAttributeValue(next.view, next.values)
            return prev
          }, {}),
        )
      }

      getFilters()
    }, [])

    if (!open)
      return (
        <button className={style.openBtn} onClick={toggleOpen}>
          <FilterIcon />
          Filters
        </button>
      )

    if (isLoading) {
      return (
        <div className={style.filtersPopup}>
          <Loader />
        </div>
      )
    }

    return (
      <div className={style.filtersPopup}>
        <div className={style.top}>
          <FilterIcon className={style.filterIcon} />
          <h2>Filters</h2>

          <CrossIcon
            size={24}
            className={style.closeBtn}
            onClick={toggleOpen}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className={style.type}>
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
                      className={style.select}
                      styles={selectStyles}
                      value={formValues[filter.attribute]}
                      onChange={newValue =>
                        onChangeFormValue(filter.attribute, newValue)
                      }
                      options={filter.values.map(v => ({ value: v, label: v }))}
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
                      setStartValue={v =>
                        onChangeFormValue(filter.attribute, v)
                      }
                      endValue={formValues[filter.attribute]?.end}
                      setEndValue={v => onChangeFormValue(filter.attribute, v)}
                    />
                  </Fragment>
                )
              default:
                return null
            }
          })}

          {error && <span className={style.error}>{error}</span>}

          <button className={style['apply-btn']} type='submit'>
            Apply
          </button>
        </form>
      </div>
    )
  },
)

export default PlotsFilters
