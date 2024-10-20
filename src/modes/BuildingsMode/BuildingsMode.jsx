import { Layer, Popup, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../constants'
import { getCountyNameByFeature } from '../../utils/getCountyNameByFeature'
import { useEventStore, useModeStore, usePaintStore } from '../../store'
import FilteredBuildings from './FilteredBuildings/FilteredBuildings'
import getBuildingHoverPopupText from '../../utils/getBuildingHoverPopup'
import { BuildingsPanel } from '../../panels'

const BuildingsMode = ({ isActive }) => {
  const { county } = useModeStore()
  const { clickedFeature, hoveredFeature, hoverEvent } = useEventStore()
  const { activePaint, opacity } = usePaintStore()

  const getCountyName = () => {
    if (!county) return ''
    const name = getCountyNameByFeature(county)
    if (name?.includes(', ')) return name.split(', ')
    return name
  }

  const buildingsFilter = [
    'match',
    ['get', 'COMMUNE'],
    getCountyName(),
    true,
    false,
  ]

  const getFillOpacity = () => {
    const hoverOpacity = (opacity[1] + 40) / 100
    if (hoveredFeature?.properties?.EGID) {
      return [
        'case',
        ['==', ['get', 'EGID'], hoveredFeature?.properties?.EGID],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        opacity[1] / 100,
      ]
    }
    return opacity[1] / 100
  }

  const getFillColor = () => {
    if (clickedFeature?.properties?.EGID) {
      return [
        'case',
        ['==', ['get', 'EGID'], clickedFeature?.properties?.EGID],
        '#ed0e2c',
        activePaint['fill-color'],
      ]
    }
    return activePaint['fill-color']
  }

  return (
    <Source id={BUILDINGS_SOURCE.id} type='vector' url={BUILDINGS_SOURCE.url}>
      <Layer
        id='buildings'
        type='fill'
        source-layer={BUILDINGS_SOURCE.sourceLayer}
        paint={{
          'fill-opacity': getFillOpacity(),
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': getFillColor(),
        }}
        filter={buildingsFilter}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      {hoveredFeature?.properties && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {getBuildingHoverPopupText(activePaint, hoveredFeature?.properties)}
        </Popup>
      )}

      <BuildingsPanel
        activeBuildingId={clickedFeature?.properties?.EGRID_CENT}
      />
      <FilteredBuildings isActive={isActive} />
    </Source>
  )
}

export default BuildingsMode
