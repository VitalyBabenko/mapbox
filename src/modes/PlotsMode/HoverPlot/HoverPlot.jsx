import { useEffect, useMemo, useState } from 'react'
import { Layer } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { PLOTS_SOURCE } from '../../../constants'

const HoverPlot = ({ isActive, map }) => {
  const { hoverEvent } = useEventStore()
  const [hoverPlotId, setHoverPlotId] = useState('')

  useEffect(() => {
    if (!isActive) return
    if (hoverEvent === null) return
    const hoverPlotFeature = map.queryRenderedFeatures(hoverEvent.point, {
      layers: ['plots'],
    })[0]

    if (!hoverPlotFeature?.properties?.EGRID) {
      setHoverPlotId('')
    }

    setHoverPlotId(hoverPlotFeature?.properties?.EGRID)
  }, [hoverEvent])

  const filterForHoverPlot = useMemo(
    () => (isActive ? ['in', 'EGRID', `${hoverPlotId}`] : ['none']),
    [hoverPlotId, isActive],
  )

  if (!isActive) return null
  return (
    <Layer
      id='plotsHover'
      type='fill'
      source={PLOTS_SOURCE.id}
      source-layer={PLOTS_SOURCE.sourceLayer}
      filter={filterForHoverPlot}
      paint={{
        'fill-color': '#58dca6',
        'fill-opacity': 0.6,
      }}
      beforeId='poi-label'
      layout={{ visibility: isActive ? 'visible' : 'none' }}
    />
  )
}

export default HoverPlot
