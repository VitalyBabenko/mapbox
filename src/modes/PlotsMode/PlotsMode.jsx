import { Layer, Source, useMap } from 'react-map-gl'
import { useModeStore } from '../../store'
import { getCountyNameByFeature } from '../../utils/getCountyNameByFeature'
import HoverPlot from './HoverPlot/HoverPlot'
import ActivePlot from './ActivePlot/ActivePlot'
import { PLOTS_SOURCE } from '../../constants'
import { useMemo } from 'react'
import FilteredPlots from './FilteredPlots/FilteredPlots'

const PlotsMode = ({ isActive }) => {
  const { current: map } = useMap()
  const { county } = useModeStore()

  const getCountyName = () => {
    if (!county) return ''
    const name = getCountyNameByFeature(county)
    if (name?.includes(', ')) return name.split(', ')
    return name
  }

  const plotsFilter = useMemo(() => {
    const countyName = getCountyName()
    return [
      'all',
      ['match', ['get', 'TYPE_PROPR'], ['privé'], true, false],
      ['match', ['get', 'COMMUNE'], countyName, true, false],
    ]
  }, [isActive, county])

  return (
    <Source id={PLOTS_SOURCE.id} type='vector' url={PLOTS_SOURCE.url}>
      <Layer
        id='plots'
        type='fill'
        source={PLOTS_SOURCE.id}
        source-layer={PLOTS_SOURCE.sourceLayer}
        filter={plotsFilter}
        paint={{
          'fill-color': '#006cd5',
          'fill-opacity': 0.4,
          'fill-outline-color': 'white',
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      <HoverPlot isActive={isActive} map={map} />
      <ActivePlot isActive={isActive} map={map} />
      <FilteredPlots isActive={isActive} />
    </Source>
  )
}

export default PlotsMode
