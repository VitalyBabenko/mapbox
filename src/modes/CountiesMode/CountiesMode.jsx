import { Layer, Source, useMap } from 'react-map-gl'
import { memo, useEffect } from 'react'
import HoverCounty from './HoverCounty/HoverCounty'
import bbox from '@turf/bbox'
import { useEventStore, useModeStore } from '../../store'
import { COUNTIES_SOURCE } from '../../constants'

const CountiesMode = ({ isActive }) => {
  const { current: map } = useMap()
  const { switcher, switchToPlotsMode, switchToBuildingsMode } = useModeStore()
  const { clickEvent } = useEventStore()

  useEffect(() => {
    if (!isActive) return
    if (clickEvent === null) return

    const clickedCountyFeature = map?.queryRenderedFeatures(clickEvent?.point, {
      layers: ['counties'],
    })[0]

    if (!clickedCountyFeature) return

    const [minLng, minLat, maxLng, maxLat] = bbox(clickedCountyFeature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )

    switcher === 'plots'
      ? switchToPlotsMode(clickedCountyFeature)
      : switchToBuildingsMode(clickedCountyFeature)
  }, [clickEvent])

  return (
    <Source id={COUNTIES_SOURCE.id} url={COUNTIES_SOURCE.url} type='vector'>
      <Layer
        id='counties'
        type='fill'
        source={COUNTIES_SOURCE.id}
        source-layer={COUNTIES_SOURCE.sourceLayer}
        paint={{
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': '#006cd5',
          'fill-opacity': 0.4,
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />
      <HoverCounty isActive={isActive} map={map} />
    </Source>
  )
}

export default memo(CountiesMode)
