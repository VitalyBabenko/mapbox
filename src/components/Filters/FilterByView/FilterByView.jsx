import Select from 'react-select'
import TypeaheadFilter from '../TypeaheadFilter/TypeaheadFilter'
import { selectStyles } from '../../../styles/selectStyles'

import RangeFilter from '../RangeFilter/RangeFilter'
import DateFilter from '../DateFilter/DateFilter'
import { TbCurrencyEuro } from 'react-icons/tb'
import { TbMeterSquare as MeterSquareIcon } from 'react-icons/tb'
import { useFilterStore } from '../../../store'

const rangeIcons = {
  prix: <TbCurrencyEuro />,
  surface_parcelle_m2: <MeterSquareIcon />,
  age: null,
}

const FilterByView = ({ filter }) => {
  const { setFilterValue } = useFilterStore()

  switch (filter.view) {
    case 'input':
      return (
        <>
          <h4>{filter.title}</h4>
          <input
            value={filter.value}
            onChange={e => setFilterValue(filter.id, e.target.value)}
          />
        </>
      )

    case 'typeahead_input':
      return (
        <TypeaheadFilter
          filter={filter}
          value={[...filter.value]}
          setSelected={s => setFilterValue(filter.id, s)}
        />
      )

    case 'multiple_dropdown':
      return (
        <>
          <h4>{filter.title}</h4>

          <Select
            name={filter.attribute}
            styles={selectStyles}
            value={filter.value}
            onChange={newValue => {
              setFilterValue(filter.id, newValue)
            }}
            options={filter.values.map(v => ({
              value: v,
              label: v,
            }))}
          />
        </>
      )

    case 'range':
      return (
        <RangeFilter
          label={filter.title}
          icon={rangeIcons[filter.attribute]}
          min={filter.values.min || 0}
          max={filter.values.max || 0}
          value={filter.value}
          setValue={v => setFilterValue(filter.id, v)}
        />
      )

    case 'date_range':
      return (
        <DateFilter
          key={filter.attribute}
          label={filter.title}
          startValue={filter.value.min}
          setStartValue={v => {
            const min = new Date(v.min).toISOString().split('T')[0]
            const max = new Date(v.max).toISOString().split('T')[0]
            const result = { min, max }
            setFilterValue(filter.id, result)
          }}
          endValue={filter.value.max}
          setEndValue={v => {
            const min = new Date(v.min).toISOString().split('T')[0]
            const max = new Date(v.max).toISOString().split('T')[0]
            const result = { min, max }
            setFilterValue(filter.id, result)
          }}
        />
      )
    default:
      return null
  }
}

export default FilterByView
