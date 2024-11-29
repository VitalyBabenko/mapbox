import { useState } from 'react'
import { IoFilter as FilterIcon } from 'react-icons/io5'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'
import style from './FiltersPanel.module.scss'
import { useFilterStore, useModeStore } from '../../store'
import PlotsFilters from './PlotsFilters/PlotsFilters'
import BuildingsFilters from './BuildingsFilters/BuildingsFilters'
import Loader from '../../components/Loader/Loader'
import useDraggable from '../../hooks/useDraggable'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import Tooltip from '../../components/Tooltip/Tooltip'
import FiltersResult from './FiltersResult/FiltersResult'
import { TbZoomCancel as StopIcon } from 'react-icons/tb'

const FiltersPanel = () => {
  const { position, handleMouseDown } = useDraggable({ x: 10, y: 50 })
  const { filteredPlotsFeatures, filteredBuildingsFeatures } = useFilterStore()
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  const { switcher } = useModeStore()
  const [mapLoader, setMapLoader] = useState(false)
  const controller = new AbortController()

  if (!open) {
    return (
      <button className={style.filtersButton} onClick={toggleOpen}>
        <FilterIcon size={19} />
        Filters
      </button>
    )
  }

  const cancelSearch = () => {
    controller.abort()
    setMapLoader(false)
  }

  const getFilterPanelContent = () => {
    if (filteredPlotsFeatures.length && switcher === 'plots') {
      return <FiltersResult switcher={switcher} />
    }

    if (filteredBuildingsFeatures.length && switcher === 'buildings') {
      return <FiltersResult switcher={switcher} />
    }

    return switcher === 'plots' ? (
      <PlotsFilters setMapLoader={setMapLoader} controller={controller} />
    ) : (
      <BuildingsFilters setMapLoader={setMapLoader} controller={controller} />
    )
  }

  return (
    <>
      {mapLoader && (
        <>
          <Loader withBackground />

          <button onClick={cancelSearch} className={style.stopQuery}>
            <StopIcon />
            Cancel search
          </button>
        </>
      )}

      <div
        style={{ top: position.y, left: position.x }}
        className={style.filtersWrapper}
      >
        <div className={style.filtersPopup}>
          <div className={style.top}>
            <FilterIcon className={style.filterIcon} />
            <h2>{switcher === 'plots' ? 'Plots' : 'Buildings'} Filters</h2>

            <Tooltip text='Move the panel' bottom='-40px'>
              <DraggableIcon
                size={24}
                className={style.draggableIcon}
                onMouseDown={handleMouseDown}
              />
            </Tooltip>

            <CrossIcon
              size={24}
              className={style.closeBtn}
              onClick={toggleOpen}
            />
          </div>

          {getFilterPanelContent()}
        </div>
      </div>
    </>
  )
}

export default FiltersPanel
