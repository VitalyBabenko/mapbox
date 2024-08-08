import { useEffect, useState } from 'react'
import { useEventStore } from '../../../store'
import { BUILDINGS_SOURCE } from '../../../constants'
import { Layer } from 'react-map-gl'
import { BuildingsPanel } from '../../../panels'

const ActiveBuilding = ({ isActive, map }) => {
  const [ActiveBuildingId, setActiveBuildingId] = useState('')
  const { clickEvent } = useEventStore()

  useEffect(() => {
    if (!isActive) return
    if (clickEvent === null) return

    const clickedBuildingFeature = map.queryRenderedFeatures(clickEvent.point, {
      layers: ['buildings'],
    })[0]

    console.log(clickedBuildingFeature)

    setActiveBuildingId(clickedBuildingFeature?.properties?.EGRID_CENT || '')
  }, [clickEvent])

  const filterForActiveBuilding = ['in', 'EGID', ActiveBuildingId]

  return (
    <>
      <Layer
        id='activeBuilding'
        type='fill'
        source={BUILDINGS_SOURCE.id}
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-color': '#ed0e2c',
          'fill-opacity': 0.6,
        }}
        filter={filterForActiveBuilding}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />
      <BuildingsPanel
        activeBuildingId={ActiveBuildingId}
        setActiveBuildingId={setActiveBuildingId}
      />
    </>
  )
}

export default ActiveBuilding
