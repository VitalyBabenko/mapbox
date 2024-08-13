import { useState } from 'react'
import { IoFilter as FilterIcon } from 'react-icons/io5'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import style from './FiltersPanel.module.scss'
import { useModeStore } from '../../store'
import PlotsFilters from './PlotsFilters/PlotsFilters'
import BuildingsFilters from './BuildingsFilters/BuildingsFilters'
import Loader from '../../components/Loader/Loader'

const FiltersPanel = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  const { switcher } = useModeStore()
  const [mapLoader, setMapLoader] = useState(false)

  if (!open) {
    return (
      <button className={style.filtersButton} onClick={toggleOpen}>
        <FilterIcon size={19} />
        Filters
      </button>
    )
  }

  return (
    <>
      {mapLoader && <Loader withBackground />}
      <div className={style.filtersWrapper}>
        <div className={style.filtersPopup}>
          <div className={style.top}>
            <FilterIcon className={style.filterIcon} />
            <h2>{switcher === 'plots' ? 'Plots' : 'Buildings'} Filters</h2>

            <CrossIcon
              size={24}
              className={style.closeBtn}
              onClick={toggleOpen}
            />
          </div>

          {switcher === 'plots' ? (
            <PlotsFilters setMapLoader={setMapLoader} />
          ) : (
            <BuildingsFilters setMapLoader={setMapLoader} />
          )}
        </div>
      </div>
    </>
  )
}

export default FiltersPanel
