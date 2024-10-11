import { useEventStore } from '../../../store'
import { BUILDINGS_SOURCE } from '../../../constants'
import { Layer } from 'react-map-gl'
import { BuildingsPanel } from '../../../panels'

const ActiveBuilding = ({ isActive, opacity }) => {
  const { clickedFeature } = useEventStore()

  const activeOpacity = (opacity + 20) / 100

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
          'fill-opacity': activeOpacity > 1 ? 1 : activeOpacity,
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
