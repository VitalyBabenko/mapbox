import { Layer, Source, useMap } from 'react-map-gl'
import { memo, useEffect } from 'react'
import bbox from '@turf/bbox'
import CountiesPopup from './components/CountiesPopup'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import { COUNTIES_SOURCE } from '../../constants'

const CountiesMode = ({ isActive, modeOnCountyClick }) => {
  const { current: map } = useMap()
  const { switcher, switchToPlotsMode, switchToBuildingsMode } = useModeStore()
  const { clickedFeature, hoveredFeature } = useEventStore()
  const { opacity } = usePaintStore()
  const { filtersResult } = useFilterStore()

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.COMMUNE) {
      return [
        'case',
        ['==', ['get', 'COMMUNE'], hoveredFeature?.properties?.COMMUNE],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  useEffect(() => {
    if (!isActive || !clickedFeature?.properties?.ABREVIATIO) return

    const [minLng, minLat, maxLng, maxLat] = bbox(clickedFeature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )

    if (modeOnCountyClick === 'plots') {
      switchToPlotsMode(clickedFeature)
    } else if (modeOnCountyClick === 'buildings') {
      switchToBuildingsMode(clickedFeature)
    } else {
      switcher === 'plots'
        ? switchToPlotsMode(clickedFeature)
        : switchToBuildingsMode(clickedFeature)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedFeature])

  const getIsActive = () => {
    if (filtersResult?.length) return false
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

      {hoveredFeature?.properties?.COMMUNE &&
        isActive &&
        !filtersResult?.length && <CountiesPopup feature={hoveredFeature} />}
    </Source>
  )
}

export default memo(CountiesMode)
