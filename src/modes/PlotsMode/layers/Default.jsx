import { Layer, Source } from 'react-map-gl'
import { PLOTS_SOURCE } from '../../../constants'
import { usePlotsFilter } from '../../../hooks'
import { usePaintStore } from '../../../store/paintStore'
import { useEventStore } from '../../../store/eventStore'
import { PUBLIC_PLOTS_TYPES } from '../../../constants/mapSources'

const Default = ({
  county,
  halfOpacity = false,
  hideFiltersResult = false,
}) => {
  const { opacity } = usePaintStore()
  const filter = usePlotsFilter(county, hideFiltersResult)
  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillOpacity = () => {
    const divisor = halfOpacity ? 2 : 1
    const baseOpacity = opacity[1] / 100 / divisor
    const hoverOpacity = Math.min((opacity[1] + 40) / 100 / divisor, 1)
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
      ? String(clickedFeature.properties.EGRID)
      : null

    const publicPlotsCase = PUBLIC_PLOTS_TYPES.flatMap(type => [
      ['==', ['get', 'TYPE_PROPR'], type],
      '#fff59d',
    ])

    const clickedCase = clickedEgrid
      ? [['==', ['to-string', ['get', 'EGRID']], clickedEgrid], '#ed0e2c']
      : []

    const defaultCase = ['#58dca6']

    return ['case', ...clickedCase, ...publicPlotsCase, ...defaultCase]
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
