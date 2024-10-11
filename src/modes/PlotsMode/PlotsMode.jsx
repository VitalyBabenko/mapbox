import { Layer, Source } from 'react-map-gl'
import { useModeStore, usePaintStore } from '../../store'
import { getCountyNameByFeature } from '../../utils/getCountyNameByFeature'
import HoverPlot from './HoverPlot/HoverPlot'
import ActivePlot from './ActivePlot/ActivePlot'
import { PLOTS_SOURCE } from '../../constants'
import { useMemo } from 'react'
import FilteredPlots from './FilteredPlots/FilteredPlots'

const PlotsMode = ({ isActive }) => {
  const { county } = useModeStore()
  const { opacity } = usePaintStore()

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
          'fill-color': '#58dca6',
          'fill-opacity': opacity[1] / 100,
          'fill-outline-color': '#337f5f',
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      <HoverPlot isActive={isActive} opacity={opacity[1]} />
      <ActivePlot isActive={isActive} opacity={opacity[1]} />
      <FilteredPlots isActive={isActive} />
    </Source>
  )
}

export default PlotsMode
