import { useMap } from 'react-map-gl'
import style from './FiltersResult.module.scss'
import { INITIAL_VIEW } from '../../../constants'
import { useEventStore, useFilterStore, useModeStore } from '../../../store'
import bbox from '@turf/bbox'
import PlotItem from './PlotItem/PlotItem'
import BuildingItem from './BuildingItem/BuildingItem'

const FiltersResult = ({ switcher }) => {
  const { current: map } = useMap()
  const { switchToCountiesMode } = useModeStore()
  const {
    filteredPlotsFeatures,
    setFilteredPlotsFeatures,
    filteredBuildingsFeatures,
    setFilteredBuildingsFeatures,
  } = useFilterStore()
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
    setFilteredPlotsFeatures([])
    setFilteredBuildingsFeatures([])
    setClickedFeature(null)
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

  const resultList = () => {
    if (switcher === 'plots') {
      return (
        <div className={style.list}>
          {filteredPlotsFeatures.map(feature => (
            <PlotItem
              key={feature.properties?.EGRID}
              isActive={
                clickedFeature?.properties?.EGRID === feature.properties?.EGRID
              }
              feature={feature}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      )
    }

    if (switcher === 'buildings') {
      return (
        <div className={style.list}>
          {filteredBuildingsFeatures.map(feature => (
            <BuildingItem
              key={feature.properties?.EGID}
              isActive={
                clickedFeature?.properties?.EGID === feature.properties?.EGID
              }
              feature={feature}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className={style.content}>
      <div className={style.contentHead}>
        <h3 className={style.title}>
          Results: {filteredPlotsFeatures.length}
          {switcher === 'plots' ? 'parcelle(s)' : 'bâtiment(s)'}
        </h3>
        <button className={style.reset} onClick={handleReset}>
          reset
        </button>
      </div>

      {resultList()}
    </div>
  )
}

export default FiltersResult
