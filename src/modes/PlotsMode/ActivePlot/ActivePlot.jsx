import { Layer } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { PLOTS_SOURCE } from '../../../constants'
import { PlotsPanel } from '../../../panels'

const ActivePlot = ({ isActive, opacity }) => {
  const { clickedFeature } = useEventStore()

  const activeOpacity = (opacity + 20) / 100

  const filterForActivePlot = isActive
    ? ['in', 'EGRID', `${clickedFeature?.properties?.EGRID}`]
    : ['none']

  return (
    <>
      <Layer
        id='activePlot'
        type='fill'
        source={PLOTS_SOURCE.id}
        source-layer={PLOTS_SOURCE.sourceLayer}
        filter={filterForActivePlot}
        paint={{
          'fill-color': '#ed0e2c',
          'fill-opacity': activeOpacity > 1 ? 1 : activeOpacity,
          'fill-outline-color': 'white',
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
    </>
  )
}

export default ActivePlot
