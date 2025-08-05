import { Layer, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../../constants'
import { useEventStore, usePaintStore } from '../../../store'
import useBuildingsFilter from '../hooks/useBuildingsFilter'

const Default = ({ county }) => {
  const { activePaint } = usePaintStore()
  const { clickedFeature, hoveredFeature } = useEventStore()
  const opacity = usePaintStore(state => state.opacity)
  const filter = useBuildingsFilter(county)

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
        '#ed0e2c',
        activePaint['fill-color'],
      ]
    }
    return activePaint['fill-color']
  }

  return (
    <Source id={BUILDINGS_SOURCE.id} type='vector' url={BUILDINGS_SOURCE.url}>
      <Layer
        id='buildings'
        type='fill'
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-opacity': getFillOpacity(),
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': getFillColor(),
        }}
        filter={filter}
        beforeId='poi-label'
      />
    </Source>
  )
}

export default Default
