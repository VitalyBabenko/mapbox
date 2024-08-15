import { useEventStore } from '../../../store'
import { BUILDINGS_SOURCE } from '../../../constants'
import { Layer } from 'react-map-gl'
import { BuildingsPanel } from '../../../panels'

const ActiveBuilding = ({ isActive }) => {
  const { clickedFeature } = useEventStore()

  const filterForActiveBuilding = [
    'in',
    'EGID',
    clickedFeature?.properties?.EGID || '',
  ]

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
        activeBuildingId={clickedFeature?.properties?.EGRID_CENT}
      />
    </>
  )
}

export default ActiveBuilding
