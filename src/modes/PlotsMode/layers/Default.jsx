import { Layer, Source } from 'react-map-gl'
import { PLOTS_SOURCE } from '../../../constants'
import usePlotsFilter from '../hooks/usePlotsFilter'
import { usePaintStore } from '../../../store/paintStore'
import { useEventStore } from '../../../store/eventStore'

const Default = ({ county }) => {
  const { opacity } = usePaintStore()
  const filter = usePlotsFilter(county)

  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillOpacity = () => {
    const baseOpacity = opacity[1] / 100
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const hoveredEgrid = hoveredFeature?.properties?.EGRID

    if (hoveredEgrid) {
      return [
        'match',
        ['get', 'EGRID'],
        hoveredEgrid,
        hoverOpacity,
        baseOpacity,
      ]
    }

    return baseOpacity
  }

  const getFillColor = () => {
    const clickedEgrid = clickedFeature?.properties?.EGRID

    if (!clickedEgrid) {
      return '#58dca6'
    }

    return [
      'case',
      ['==', ['get', 'EGRID'], clickedEgrid],
      '#ed0e2c',
      '#58dca6',
    ]
  }

  return (
    <Source id={PLOTS_SOURCE.id} type='vector' url={PLOTS_SOURCE.url}>
      <Layer
        id='plots'
        type='fill'
        source={PLOTS_SOURCE.id}
        source-layer={PLOTS_SOURCE.sourceLayer}
        filter={filter}
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

export default Default
