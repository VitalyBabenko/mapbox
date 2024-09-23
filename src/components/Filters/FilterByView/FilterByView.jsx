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

const FilterByView = ({ view, filter }) => {
  const { formValues, setInputValue } = useFilterStore()

  switch (view) {
    case 'input':
      return (
        <>
          <h4>{filter.title}</h4>
          <input
            value={formValues[filter.attribute]}
            onChange={e => setInputValue(filter.attribute, e.target.value)}
          />
        </>
      )

    case 'typeahead_input':
      return (
        <TypeaheadFilter
          filter={filter}
          value={[...formValues[filter.attribute]]}
          setSelected={s => setInputValue(filter.attribute, s)}
        />
      )

    case 'multiple_dropdown':
      return (
        <>
          <h4>{filter.title}</h4>

          <Select
            name={filter.attribute}
            styles={selectStyles}
            value={formValues[filter.attribute]}
            onChange={newValue => {
              setInputValue(filter.attribute, newValue)
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
          value={formValues[filter.attribute]}
          setValue={v => setInputValue(filter.attribute, v)}
        />
      )

    case 'date_range':
      return (
        <DateFilter
          key={filter.attribute}
          label={filter.title}
          startValue={formValues[filter.attribute]?.start}
          setStartValue={v => setInputValue(filter.attribute, v)}
          endValue={formValues[filter.attribute]?.end}
          setEndValue={v => setInputValue(filter.attribute, v)}
        />
      )
    default:
      return null
  }
}

export default FilterByView
