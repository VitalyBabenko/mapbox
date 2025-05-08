import style from './TypeaheadFilter.module.scss'
import { Typeahead } from 'react-bootstrap-typeahead'

const TypeaheadFilter = ({ filter, setSelected, value }) => {
  const options = filter.values?.length
    ? filter.values.map(value => ({
        label: value,
      }))
    : []

  return (
    <>
      <h4>{filter.title}</h4>

      <Typeahead
        positionFixed
        id={filter.attribute}
        onChange={setSelected}
        options={options}
        selected={value}
        maxResults={10}
        allowNew
        newSelectionPrefix=''
        className={style.typehead}
      />
    </>
  )
}

export default TypeaheadFilter
