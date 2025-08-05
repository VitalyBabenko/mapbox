import { Layer, Source } from 'react-map-gl'
import { useEventStore, usePaintStore } from '../../../store'
import { useMemo } from 'react'

const FilteredWithoutCounty = ({ filtersResult }) => {
  const { clickedFeature, hoveredFeature } = useEventStore()
  const opacity = usePaintStore(state => state.opacity)

  const geojson = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: filtersResult,
    }
  }, [filtersResult])

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.EGID) {
      return [
        'case',
        ['==', ['get', 'EGID'], hoveredFeature?.properties?.EGID],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  const getFillColor = () => {
    if (clickedFeature?.properties?.EGID) {
      return [
        'case',
        ['==', ['get', 'EGID'], clickedFeature?.properties?.EGID],
        '#ff8c00',
        '#00C0F0',
      ]
    }

    return '#00C0F0'
  }

  return (
    <Source id='filteredBuildingsSource' type='geojson' data={geojson}>
      <Layer
        id='filteredBuildings'
        type='fill'
        paint={{
          'fill-color': getFillColor(),
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-opacity': getFillOpacity(),
        }}
        beforeId='poi-label'
        layout={{
          visibility: 'visible',
        }}
      />
    </Source>
  )
}

export default FilteredWithoutCounty
