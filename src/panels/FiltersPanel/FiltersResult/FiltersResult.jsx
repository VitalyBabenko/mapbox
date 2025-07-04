import { useMap } from 'react-map-gl'
import style from './FiltersResult.module.scss'
import { INITIAL_VIEW } from '../../../constants'
import { useEventStore, useFilterStore, useModeStore } from '../../../store'
import bbox from '@turf/bbox'
import PlotItem from './PlotItem/PlotItem'
import BuildingItem from './BuildingItem/BuildingItem'
import { useLocale } from '../../../hooks/useLocale'

const FiltersResult = ({ filtersFor }) => {
  const { t } = useLocale('panels.filters')
  const { current: map } = useMap()
  const { filtersResult, setFiltersResult } = useFilterStore()
  const { switchToCountiesMode } = useModeStore()
  const { clickedFeature, setClickedFeature } = useEventStore()

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

  return (
    <div className={style.content}>
      <div className={style.contentHead}>
        <h3 className={style.title}>{getTitle()}</h3>

        <button className={style.reset} onClick={handleReset}>
          {t('buttons.reset')}
        </button>
      </div>

      <div className={style.list}>
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
                  clickedFeature?.properties?.EGID === feature.properties?.EGID
                }
                feature={feature}
                handleItemClick={handleItemClick}
              />
            )
          }
        })}
      </div>
    </div>
  )
}

export default FiltersResult
