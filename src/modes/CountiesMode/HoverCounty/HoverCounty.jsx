import { useEffect, useMemo, useState } from 'react'
import { Layer, Popup } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { getCountyNameByFeature } from '../../../utils/getCountyNameByFeature'
import style from './HoverCounty.module.scss'
import { COUNTIES_SOURCE } from '../../../constants'

const HoverCounty = ({ isActive, map }) => {
  const { hoverEvent } = useEventStore()
  const [hoverCounty, setHoverCounty] = useState({ id: '', name: '' })

  const filterForHoverCounty = useMemo(
    () => ['in', 'genid', hoverCounty.id],
    [hoverCounty],
  )

  useEffect(() => {
    if (!isActive) return
    if (hoverEvent === null) return

    const hoverCountyFeature = map?.queryRenderedFeatures(hoverEvent?.point, {
      layers: ['counties'],
    })[0]

    if (!hoverCountyFeature) {
      setHoverCounty({ id: '', name: '' })
      return
    }

    setHoverCounty({
      id: hoverCountyFeature.properties.genid,
      name: getCountyNameByFeature(hoverCountyFeature),
    })
  }, [hoverEvent])

  if (!isActive) return null
  if (!hoverCounty.id) return null
  return (
    <>
      <Layer
        id='countiesHover'
        type='fill'
        source={COUNTIES_SOURCE.id}
        source-layer={COUNTIES_SOURCE.sourceLayer}
        paint={{
          'fill-color': '#006cd5',
          'fill-opacity': 0.6,
        }}
        filter={filterForHoverCounty}
        layout={{ visibility: isActive ? 'visible' : 'none' }}
        beforeId='poi-label'
      />

      {hoverCounty.name && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className={style.popup}
        >
          {hoverCounty.name}
        </Popup>
      )}
    </>
  )
}

export default HoverCounty
