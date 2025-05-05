import { useEffect, useRef, useState } from 'react'
import style from './FilterAccordion.module.scss'
import FilterByView from '../FilterByView/FilterByView'
import { IoIosArrowDown as Arrow } from 'react-icons/io'
import FilterAccordionValues from './FilterAccordionValues/FilterAccordionValues'

const FilterAccordion = props => {
  const { title, filters } = props
  const [open, setOpen] = useState(false)
  const accordionRef = useRef(null)
  const headingRef = useRef(null)

  const accordionClassName = `${style.accordion} ${open ? style.open : ''}`

  useEffect(() => {
    accordionRef.current.style.maxHeight = open
      ? `${accordionRef.current.scrollHeight}px`
      : `${headingRef.current.scrollHeight}px`
  }, [open])

  return (
    <div ref={accordionRef} className={accordionClassName}>
      <button
        ref={headingRef}
        className={style.heading}
        onClick={() => setOpen(prev => !prev)}
        type='button'
      >
        <h3 className={style.title}>{title}</h3>

        <Arrow className={style.arrow} />

        {!open && <FilterAccordionValues filters={filters} />}
      </button>

      <div className={style.filters}>
        {filters.map(filter => (
          <FilterByView key={filter.id} filter={filter} />
        ))}
      </div>
    </div>
  )
}

export default FilterAccordion
