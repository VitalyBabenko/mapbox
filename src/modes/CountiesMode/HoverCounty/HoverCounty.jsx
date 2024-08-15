import { useMemo } from 'react'
import { Layer, Popup } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { getCountyNameByFeature } from '../../../utils/getCountyNameByFeature'
import style from './HoverCounty.module.scss'
import { COUNTIES_SOURCE } from '../../../constants'

const HoverCounty = ({ isActive }) => {
  const { hoverEvent, hoveredFeature } = useEventStore()

  const filterForHoverCounty = useMemo(() => {
    return ['in', 'genid', hoveredFeature?.properties?.genid || 0]
  }, [hoveredFeature])

  if (!isActive) return null
  return (
    <>
      <Layer
        id='countiesHover'
        type='fill'
        source={COUNTIES_SOURCE.id}
        source-layer={COUNTIES_SOURCE.sourceLayer}
        paint={{
          'fill-color': '#024eaa',
          'fill-opacity': 0.6,
        }}
        filter={filterForHoverCounty}
        layout={{ visibility: isActive ? 'visible' : 'none' }}
        beforeId='poi-label'
      />

      {getCountyNameByFeature(hoveredFeature) && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className={style.popup}
        >
          {getCountyNameByFeature(hoveredFeature)}
        </Popup>
      )}
    </>
  )
}

export default HoverCounty
