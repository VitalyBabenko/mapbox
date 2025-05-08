import React from 'react'
import { useEventStore, usePaintStore } from '../../store'
import { Layer, Source } from 'react-map-gl'

const GeojsonRenderer = ({ sourceId, layerId, isActive, geojson }) => {
  const { opacity } = usePaintStore()
  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.EGRID) {
      return [
        'case',
        ['==', ['get', 'EGRID'], hoveredFeature?.properties?.EGRID],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  const getFillColor = () => {
    if (clickedFeature?.properties?.EGRID) {
      return [
        'case',
        ['==', ['get', 'EGRID'], clickedFeature?.properties?.EGRID],
        '#ed0e2c',
        '#58dca6',
      ]
    }
    return '#58dca6'
  }

  return (
    <Source id={sourceId} type='geojson' data={geojson}>
      <Layer
        id={layerId}
        type='fill'
        paint={{
          'fill-outline-color': '#006cd5',
          'fill-color': getFillColor(),
          'fill-opacity': getFillOpacity(),
        }}
        layout={{
          visibility: isActive ? 'visible' : 'none',
        }}
        beforeId='poi-label'
      />
    </Source>
  )
}

export default GeojsonRenderer
