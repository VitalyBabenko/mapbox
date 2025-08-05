import { useEffect, useState } from 'react'
import { useMap } from 'react-map-gl'
import Drawer from '../../../components/Drawer/Drawer'
import { INITIAL_VIEW } from '../../../constants'
import { useEventStore, useFilterStore, useModeStore } from '../../../store'
import bbox from '@turf/bbox'
import PlotItem from '../FiltersResult/PlotItem/PlotItem'
import BuildingItem from '../FiltersResult/BuildingItem/BuildingItem'
import { useLocale } from '../../../hooks/useLocale'
import { TbFilterSearch as FilterIcon } from 'react-icons/tb'
import { MdKeyboardArrowRight as ArrowRightIcon } from 'react-icons/md'
import style from './FiltersResultDrawer.module.scss'
import { Tooltip } from '../../../components'

const FiltersResultDrawer = ({ filtersFor = 'plots' }) => {
  const [open, setOpen] = useState(false)
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const { t } = useLocale('panels.filters')
  const { current: map } = useMap()
  const { filtersResult, setFiltersResult } = useFilterStore()
  const { switchToCountiesMode } = useModeStore()
  const { clickedFeature, setClickedFeature } = useEventStore()

  useEffect(() => {
    if (open) {
      setShowCloseBtn(true)
    } else {
      const timer = setTimeout(() => setShowCloseBtn(false), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (filtersResult.length) {
      setOpen(true)
    }
  }, [filtersResult])

  const handleItemClick = feature => {
    const [minLng, minLat, maxLng, maxLat] = bbox(feature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 2000, zoom: 17 },
    )
    setClickedFeature(feature)
  }

  const handleReset = () => {
    setClickedFeature(null)
    setFiltersResult([])
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, '', url)
  }

  const getTitle = () => {
    let item = ''
    switch (filtersFor) {
      case 'buildings':
        item = 'bâtiment(s)'
        break
      case 'transactions':
        item = 'transaction(s)'
        break
      case 'construction-certs':
        item = 'certificat(s)'
        break
      default:
        item = 'parcelle(s)'
    }
    return `${t('results.title')} ${filtersResult?.length} ${item}`
  }

  if (!filtersResult.length) return null

  return (
    <>
      <Tooltip
        className={style.tooltip}
        text='Filters Result'
        left='-100px'
        top='-15px'
      >
        <button className={style.openButton} onClick={() => setOpen(true)}>
          <FilterIcon size={20} />
        </button>
      </Tooltip>

      <Drawer
        icon={<FilterIcon size={24} color='#344054' />}
        title={getTitle()}
        isOpen={open}
        onClose={() => setOpen(false)}
        onReset={handleReset}
      >
        <button
          className={`${style.closeButton} ${open ? style.show : style.hide}`}
          onClick={() => setOpen(false)}
          style={{ display: showCloseBtn ? 'block' : 'none' }}
        >
          <ArrowRightIcon size={24} />
        </button>

        <div className={style.items}>
          {filtersResult.map(feature => {
            if (
              filtersFor === 'plots' ||
              filtersFor === 'transactions' ||
              filtersFor === 'construction-certs'
            ) {
              return (
                <PlotItem
                  key={feature.properties?.EGRID}
                  isActive={
                    clickedFeature?.properties?.EGRID ===
                    feature.properties?.EGRID
                  }
                  feature={feature}
                  handleItemClick={handleItemClick}
                />
              )
            }

            if (filtersFor === 'buildings') {
              return (
                <BuildingItem
                  key={feature.properties?.EGID}
                  isActive={
                    clickedFeature?.properties?.EGID ===
                    feature.properties?.EGID
                  }
                  feature={feature}
                  handleItemClick={handleItemClick}
                />
              )
            }

            return null
          })}
        </div>
      </Drawer>
    </>
  )
}

export default FiltersResultDrawer
