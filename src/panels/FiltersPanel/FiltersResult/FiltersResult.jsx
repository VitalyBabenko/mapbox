import { useMap } from 'react-map-gl'
import style from './FiltersResult.module.scss'
import { INITIAL_VIEW, PLOTS_SOURCE } from '../../../constants'
import { useEventStore, useFilterStore, useModeStore } from '../../../store'
import { useEffect, useState } from 'react'
import bbox from '@turf/bbox'

const FiltersResult = ({ features }) => {
  const { current: map } = useMap()
  const { switchToCountiesMode } = useModeStore()
  const {
    filteredPlotsFeatures,
    setFilteredPlotsFeatures,
    setFilteredBuildingsIds,
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
    setFilteredBuildingsIds([])
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
  }

  const getItemClassName = feature => {
    if (clickedFeature?.properties?.EGRID === feature?.properties?.EGRID) {
      return `${style.item} ${style.active}`
    } else {
      return style.item
    }
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
        {filteredPlotsFeatures.map(feature => (
          <div
            key={feature.properties?.EGRID}
            className={getItemClassName(feature)}
            onClick={() => handleItemClick(feature)}
          >
            <p className={style.itemTitle}>
              Plot <span>{feature?.properties?.IDEDDP.replace(':', '/')}</span>
            </p>
            <p className={style.county}>{feature?.properties?.COMMUNE}</p>

            <ul className={style.fields}>
              {feature?.properties?.SURFACE && (
                <p className={style.field}>
                  Surface: <span>{feature?.properties?.SURFACE} m²</span>
                </p>
              )}

              {feature?.properties?.TYPOLOGIE && (
                <p className={style.field}>
                  Typologie: <span>{feature?.properties?.TYPOLOGIE}</span>
                </p>
              )}

              <p className={style.field}>
                ERGID: <span>{feature?.properties?.EGRID}</span>
              </p>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FiltersResult
