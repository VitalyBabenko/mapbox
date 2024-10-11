import { Layer, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../constants'
import { getCountyNameByFeature } from '../../utils/getCountyNameByFeature'
import { useModeStore, usePaintStore } from '../../store'
import HoverBuilding from './HoverBuilding/HoverBuilding'
import ActiveBuilding from './ActiveBuilding/ActiveBuilding'
import FilteredBuildings from './FilteredBuildings/FilteredBuildings'

const BuildingsMode = ({ isActive }) => {
  const { county } = useModeStore()
  const { activePaint, opacity } = usePaintStore()

  const getCountyName = () => {
    if (!county) return ''
    const name = getCountyNameByFeature(county)
    if (name?.includes(', ')) return name.split(', ')
    return name
  }

  let countyFilter = ['match', ['get', 'COMMUNE'], getCountyName(), true, false]

  return (
    <Source id={BUILDINGS_SOURCE.id} type='vector' url={BUILDINGS_SOURCE.url}>
      <Layer
        id='buildings'
        type='fill'
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-opacity': opacity[1] / 100,
          ...activePaint,
        }}
        filter={countyFilter}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />
      <HoverBuilding isActive={isActive} opacity={opacity[1]} />
      <ActiveBuilding isActive={isActive} opacity={opacity[1]} />
      <FilteredBuildings isActive={isActive} />
    </Source>
  )
}

export default BuildingsMode
