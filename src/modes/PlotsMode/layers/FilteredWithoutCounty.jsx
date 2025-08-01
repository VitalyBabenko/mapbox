import { Layer, Source } from 'react-map-gl'
import { usePaintStore } from '../../../store/paintStore'
import { useMemo } from 'react'
import { useEventStore } from '../../../store/eventStore'

const FilteredWithoutCounty = ({ filtersResult }) => {
  const { opacity } = usePaintStore()

  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillColor = () => {
    if (clickedFeature?.properties?.EGRID) {
      return [
        'case',
        ['==', ['get', 'EGRID'], clickedFeature?.properties?.EGRID],
        '#ff8c00',
        '#00C0F0',
      ]
    }

    return '#00C0F0'
  }

  const getFillOpacity = () => {
    const baseOpacity = opacity[1] / 100
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const hoveredEgid = hoveredFeature?.properties?.EGRID

    if (hoveredEgid) {
      return ['match', ['get', 'EGRID'], hoveredEgid, hoverOpacity, baseOpacity]
    }

    return baseOpacity
  }

  const geojson = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: filtersResult,
    }),
    [filtersResult],
  )

  return (
    <Source id='filteredPlotsSource' type='geojson' data={geojson}>
      <Layer
        id='filteredPlots'
        type='fill'
        paint={{
          'fill-color': getFillColor(),
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-opacity': getFillOpacity(),
        }}
        beforeId='poi-label'
      />
    </Source>
  )
}

export default FilteredWithoutCounty
