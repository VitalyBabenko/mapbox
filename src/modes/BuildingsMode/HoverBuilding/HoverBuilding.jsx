import { Layer } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../../constants'
import { useEffect, useMemo, useState } from 'react'
import { useEventStore } from '../../../store'

const HoverBuilding = ({ isActive, map }) => {
  const { hoverEvent } = useEventStore(state => state)
  const [hoverBuildingId, setHoverBuildingId] = useState(0)

  useEffect(() => {
    if (hoverEvent === null) return

    const hoverBuildingFeature = map.queryRenderedFeatures(hoverEvent.point, {
      layers: ['buildings'],
    })[0]

    setHoverBuildingId(hoverBuildingFeature?.properties?.EGID || 0)
  }, [hoverEvent])

  const filterForHoverBuilding = useMemo(
    () => ['in', 'EGID', hoverBuildingId],
    [isActive, hoverBuildingId],
  )

  return (
    <Layer
      id='hoverBuilding'
      type='fill'
      source={BUILDINGS_SOURCE.id}
      source-layer={BUILDINGS_SOURCE.sourceLayer}
      paint={{
        'fill-color': '#006cd5',
        'fill-opacity': 0.6,
      }}
      filter={filterForHoverBuilding}
      beforeId='poi-label'
      layout={{ visibility: isActive ? 'visible' : 'none' }}
    />
  )
}

export default HoverBuilding
