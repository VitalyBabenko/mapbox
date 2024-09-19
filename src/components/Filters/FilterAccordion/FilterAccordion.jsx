import { useEffect, useRef, useState } from 'react'
import style from './FilterAccordion.module.scss'
import FilterByView from '../FilterByView/FilterByView'
import { IoIosArrowDown as Arrow } from 'react-icons/io'

const FilterAccordion = props => {
  const { title, filters, formValues, onChangeFormValue } = props
  const [open, setOpen] = useState(false)
  const accordionRef = useRef(null)

  const accordionClassName = `${style.accordion} ${open ? style.open : ''}`

  useEffect(() => {
    accordionRef.current.style.maxHeight = open
      ? `${accordionRef.current.scrollHeight}px`
      : '50px'
  }, [open])

  return (
    <div ref={accordionRef} className={accordionClassName}>
      <button className={style.heading} onClick={() => setOpen(prev => !prev)}>
        <h3 className={style.title}>{title}</h3>
        <Arrow className={style.arrow} />
      </button>

      <div className={style.filters}>
        {filters.map(filter => (
          <FilterByView
            key={filter.id}
            view={filter.view}
            filter={filter}
            formValues={formValues}
            onChangeFormValue={onChangeFormValue}
          />
        ))}
      </div>
    </div>
  )
}

export default FilterAccordion
