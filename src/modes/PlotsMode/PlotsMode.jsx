import { useMemo } from 'react'
import { Layer, Popup, Source } from 'react-map-gl'
import { PLOTS_SOURCE } from '../../constants'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'

const PlotsMode = ({ isActive }) => {
  const { county, switcher } = useModeStore()
  const { opacity } = usePaintStore()
  const { hoverEvent, hoveredFeature, clickedFeature } = useEventStore()
  const { filteredPlotsFeatures, filtersResult } = useFilterStore()

  const plotsFilter = useMemo(() => {
    const countyName = county?.properties?.COMMUNE || ''
    return ['all', ['match', ['get', 'COMMUNE'], countyName, true, false]]
  }, [isActive, county])

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (!hoveredFeature?.properties?.EGRID) {
      return opacity[1] / 100
    }

    return [
      'case',
      ['==', ['get', 'EGRID'], hoveredFeature?.properties?.EGRID],
      hoverOpacity > 1 ? 1 : hoverOpacity,
      opacity[1] / 100,
    ]
  }

  const getFillColor = () => {
    if (!clickedFeature?.properties?.EGRID) return '#58dca6'

    return [
      'case',
      ['==', ['get', 'EGRID'], clickedFeature?.properties?.EGRID],
      '#ed0e2c',
      '#58dca6',
    ]
  }

  const isFilteredFeaturesActive =
    switcher === 'plots' && filtersResult?.[0]?.properties?.EGRID

  const geojson = {
    type: 'FeatureCollection',
    features: filtersResult,
  }

  return (
    <>
      <Source id='filteredPlotsSource' type='geojson' data={geojson}>
        <Layer
          id='filteredPlots'
          type='fill'
          paint={{
            'fill-color': getFillColor(),
            'fill-outline-color': '#337f5f',
            'fill-opacity': getFillOpacity(),
          }}
          beforeId='poi-label'
          layout={{
            visibility: isFilteredFeaturesActive ? 'visible' : 'none',
          }}
        />
      </Source>

      <Source id={PLOTS_SOURCE.id} type='vector' url={PLOTS_SOURCE.url}>
        <Layer
          id='plots'
          type='fill'
          source={PLOTS_SOURCE.id}
          source-layer={PLOTS_SOURCE.sourceLayer}
          filter={plotsFilter}
          paint={{
            'fill-color': getFillColor(),
            'fill-outline-color': '#337f5f',
            'fill-opacity': getFillOpacity(),
          }}
          beforeId='poi-label'
          layout={{
            visibility: isActive ? 'visible' : 'none',
          }}
        />
      </Source>

      {Boolean(hoveredFeature?.properties?.IDEDDP) && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          Plot: {hoveredFeature?.properties?.IDEDDP?.replace(':', '/')}
        </Popup>
      )}

      {hoveredFeature?.properties?.MUTCOM && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          Pool
        </Popup>
      )}
    </>
  )
}

export default PlotsMode
