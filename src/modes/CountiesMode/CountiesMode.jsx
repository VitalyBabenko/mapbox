import { Layer, Popup, Source, useMap } from 'react-map-gl'
import { memo, useEffect } from 'react'
import bbox from '@turf/bbox'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import { COUNTIES_SOURCE } from '../../constants'
import { getCountyNameByFeature } from '../../utils/getCountyNameByFeature'

const CountiesMode = ({ isActive }) => {
  const { current: map } = useMap()
  const { switcher, switchToPlotsMode, switchToBuildingsMode } = useModeStore()
  const { clickedFeature, hoveredFeature, hoverEvent } = useEventStore()
  const { opacity } = usePaintStore()
  const { filteredBuildingsFeatures, filteredPlotsFeatures } = useFilterStore()

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.genid) {
      return [
        'case',
        ['==', ['get', 'genid'], hoveredFeature?.properties?.genid],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  // console.log(clickedFeature)

  useEffect(() => {
    if (!isActive) return
    if (clickedFeature === null) return

    const [minLng, minLat, maxLng, maxLat] = bbox(clickedFeature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )

    switcher === 'plots'
      ? switchToPlotsMode(clickedFeature)
      : switchToBuildingsMode(clickedFeature)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedFeature])

  const getIsActive = () => {
    if (filteredPlotsFeatures.length > 0 && switcher === 'plots') {
      return false
    }

    if (filteredBuildingsFeatures.length > 0 && switcher === 'buildings') {
      return false
    }

    return isActive
  }

  return (
    <Source id={COUNTIES_SOURCE.id} url={COUNTIES_SOURCE.url} type='vector'>
      <Layer
        id='counties'
        type='fill'
        source={COUNTIES_SOURCE.id}
        source-layer={COUNTIES_SOURCE.sourceLayer}
        paint={{
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': '#024eaa',
          'fill-opacity': getFillOpacity(),
        }}
        beforeId='poi-label'
        layout={{ visibility: getIsActive() ? 'visible' : 'none' }}
      />
      {getCountyNameByFeature(hoveredFeature) && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {getCountyNameByFeature(hoveredFeature)}
        </Popup>
      )}
    </Source>
  )
}

export default memo(CountiesMode)
