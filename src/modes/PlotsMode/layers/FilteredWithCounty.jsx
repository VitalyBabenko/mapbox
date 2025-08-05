import { Layer, Source } from 'react-map-gl'
import usePlotsFilter from '../hooks/usePlotsFilter'
import { PLOTS_SOURCE } from '../../../constants'
import { useEventStore, usePaintStore } from '../../../store'
import { PUBLIC_PLOTS_TYPES } from '../../../constants/mapSources'

const FilteredWithCounty = ({ county, filtersResult }) => {
  const { opacity } = usePaintStore()
  const filter = usePlotsFilter(county)
  const { hoveredFeature, clickedFeature } = useEventStore()

  const getFillColor = () => {
    const clickedEgrid = clickedFeature?.properties?.EGRID
      ? String(clickedFeature.properties.EGRID)
      : null

    const searchedEgrids = filtersResult
      .map(f => f?.properties?.EGRID)
      .filter(Boolean)
      .map(String)

    const clickedAndSearchedCase = [
      clickedEgrid && searchedEgrids.includes(clickedEgrid)
        ? ['==', ['to-string', ['get', 'EGRID']], clickedEgrid]
        : false,
      '#ff6f31',
    ]

    const clickedCase = [
      clickedEgrid
        ? ['==', ['to-string', ['get', 'EGRID']], clickedEgrid]
        : false,
      '#ed0e2c',
    ]

    const searchedCase = [
      ['in', ['to-string', ['get', 'EGRID']], ['literal', searchedEgrids]],
      '#00C0F0',
    ]

    const publicPlotsCases = PUBLIC_PLOTS_TYPES.map(type => [
      ['==', ['get', 'TYPE_PROPR'], type],
      '#fff59d',
    ]).flat()

    const defaultCase = ['#58dca6']

    return [
      'case',
      ...clickedAndSearchedCase,
      ...clickedCase,
      ...searchedCase,
      ...publicPlotsCases,
      ...defaultCase,
    ]
  }

  const getFillOpacity = () => {
    const baseOpacity = opacity[1] / 100
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const dimmedOpacity = baseOpacity / 4

    const hoveredEgrid = hoveredFeature?.properties?.EGRID
      ? String(hoveredFeature.properties.EGRID)
      : null

    const searchedEgrids = filtersResult
      .map(f => f?.properties?.EGRID)
      .filter(Boolean)
      .map(String)

    return [
      'case',

      hoveredEgrid
        ? ['==', ['to-string', ['get', 'EGRID']], hoveredEgrid]
        : false,
      hoverOpacity,

      ['in', ['to-string', ['get', 'EGRID']], ['literal', searchedEgrids]],
      baseOpacity,

      dimmedOpacity,
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

export default FilteredWithCounty
