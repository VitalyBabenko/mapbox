import { Layer } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { useEffect, useState } from 'react'
import { PLOTS_SOURCE } from '../../../constants'
import { PlotsPanel } from '../../../panels'

const ActivePlot = ({ isActive, map }) => {
  const [activePlotId, setActivePlotId] = useState('')
  const { clickEvent } = useEventStore()

  useEffect(() => {
    if (!isActive) return
    if (clickEvent === null) return

    const clickedPlotFeature = map.queryRenderedFeatures(clickEvent.point, {
      layers: ['plots'],
    })[0]

    if (!clickedPlotFeature) return

    setActivePlotId(clickedPlotFeature?.properties?.EGRID)
  }, [clickEvent])

  const filterForActivePlot = isActive
    ? ['in', 'EGRID', activePlotId]
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
          'fill-opacity': 0.6,
          'fill-outline-color': 'white',
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      <PlotsPanel
        activePlotId={activePlotId}
        setActivePlotId={setActivePlotId}
      />
    </>
  )
}

export default ActivePlot
