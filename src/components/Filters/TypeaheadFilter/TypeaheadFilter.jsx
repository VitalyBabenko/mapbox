import React, { useState } from 'react'
import style from './TypeaheadFilter.module.scss'
import { Typeahead } from 'react-bootstrap-typeahead'

const TypeaheadFilter = ({ filter, setSelected, value }) => {
  const options = filter.values.map((value) => ({
    label: value,
  }))

  return (
    <>
      <h3>{filter.title}</h3>

      <Typeahead
        id={filter.attribute}
        onChange={setSelected}
        options={options}
        selected={value}
        maxResults={10}
        className={style.typehead}
      />
    </>
  )
}

export default TypeaheadFilter
