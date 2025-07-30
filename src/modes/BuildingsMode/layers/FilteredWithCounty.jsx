import { Layer, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../../constants'
import { useEventStore, usePaintStore } from '../../../store'
import useBuildingsFilter from '../hooks/useBuildingsFilter'

const FilteredWithCounty = ({ county, filtersResult }) => {
  const { activePaint } = usePaintStore()
  const { clickedFeature, hoveredFeature } = useEventStore()
  const opacity = usePaintStore(state => state.opacity)
  const filter = useBuildingsFilter(county)

  const getFillOpacity = () => {
    const baseOpacity = opacity[1] / 100
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const dimmedOpacity = baseOpacity / 4

    const hoveredEgid = hoveredFeature?.properties?.EGID
      ? String(hoveredFeature.properties.EGID)
      : null

    const searchedEgids = filtersResult
      .map(f => f?.properties?.EGID)
      .filter(Boolean)
      .map(String)

    return [
      'case',

      hoveredEgid ? ['==', ['to-string', ['get', 'EGID']], hoveredEgid] : false,
      hoverOpacity,

      ['in', ['to-string', ['get', 'EGID']], ['literal', searchedEgids]],
      baseOpacity,

      dimmedOpacity,
    ]
  }

  const getFillColor = () => {
    const clickedEgid = clickedFeature?.properties?.EGID
      ? String(clickedFeature.properties.EGID)
      : null

    const searchedEgids = filtersResult
      .map(f => f?.properties?.EGID)
      .filter(Boolean)
      .map(String)

    return [
      'case',
      clickedEgid && searchedEgids.includes(clickedEgid)
        ? ['==', ['to-string', ['get', 'EGID']], clickedEgid]
        : false,
      '#ff6f31',

      clickedEgid ? ['==', ['to-string', ['get', 'EGID']], clickedEgid] : false,
      '#ed0e2c',

      ['in', ['to-string', ['get', 'EGID']], ['literal', searchedEgids]],
      '#00C0F0',

      activePaint['fill-color'],
    ]
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

export default FilteredWithCounty
