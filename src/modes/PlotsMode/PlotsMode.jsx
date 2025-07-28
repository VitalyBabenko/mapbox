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
  const { county } = useModeStore()
  const { opacity } = usePaintStore()
  const { hoverEvent, hoveredFeature, clickedFeature } = useEventStore()
  const { filtersResult, filters } = useFilterStore()
  const isSearch = Boolean(filtersResult?.length)

  const plotsFilter = useMemo(() => {
    const countyName = county?.properties?.COMMUNE || ''
    return ['all', ['match', ['get', 'COMMUNE'], countyName, true, false]]
  }, [isActive, county])

  const getFillOpacity = () => {
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const baseOpacity = opacity[1] / 100
    const highlightedOpacity = Math.min(baseOpacity + 0.4, 1)

    const searchedEgrids = isSearch
      ? filtersResult.map(f => f?.properties?.EGRID?.trim?.()).filter(Boolean)
      : []

    const hoveredEgrid = hoveredFeature?.properties?.EGRID?.trim?.()

    if (!searchedEgrids.length && !hoveredEgrid) {
      return baseOpacity
    }

    const opacityCase = ['match', ['get', 'EGRID']]

    searchedEgrids.forEach(id => {
      opacityCase.push(id, highlightedOpacity)
    })

    if (hoveredEgrid) {
      opacityCase.push(hoveredEgrid, hoverOpacity)
    }

    opacityCase.push(baseOpacity)

    return opacityCase
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
            visibility: !filters[3]?.value?.length ? 'visible' : 'none',
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
