import { useMap } from 'react-map-gl'
import style from './FiltersResult.module.scss'
import { INITIAL_VIEW, PLOTS_SOURCE } from '../../../constants'
import { useFilterStore, useModeStore } from '../../../store'
import { useEffect, useState } from 'react'

const FiltersResult = ({ resultIds }) => {
  const { current: map } = useMap()
  const { switchToCountiesMode } = useModeStore()
  const {
    setFilteredPlotsIds,
    filteredPlotsFeatures,
    setFilteredBuildingsIds,
  } = useFilterStore()

  const getPlotsFeatures = () => {
    const plotsFilter = [
      'all',
      ['==', 'TYPE_PROPR', 'privé'],
      ['in', 'EGRID', ...resultIds],
    ]

    const features = map.querySourceFeatures(PLOTS_SOURCE.id, {
      layer: 'plotsForFilters',
      sourceLayer: PLOTS_SOURCE.sourceLayer,
      validate: false,
      filter: plotsFilter,
    })[0]

    return features
  }

  getPlotsFeatures()

  const handleReset = () => {
    setFilteredPlotsIds([])
    setFilteredBuildingsIds([])
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
  }

  return (
    <div className={style.content}>
      <div className={style.contentHead}>
        <h3 className={style.title}>Results:</h3>
        <button className={style.reset} onClick={handleReset}>
          reset
        </button>
      </div>

      <div className={style.list}>
        {resultIds.map(id => (
          <div key={id} className={style.item}>
            {id}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FiltersResult
