import { Layer, Popup, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../constants'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import getBuildingHoverPopupText from '../../utils/getBuildingHoverPopup'
import { BuildingsPanel } from '../../panels'

const BuildingsMode = ({ isActive }) => {
  const { county, switcher } = useModeStore()
  const { clickedFeature, hoveredFeature, hoverEvent } = useEventStore()
  const { activePaint, opacity } = usePaintStore()
  const { filteredBuildingsFeatures } = useFilterStore()

  const buildingsFilter = [
    'match',
    ['get', 'COMMUNE'],
    county?.properties?.COMMUNE || '',
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

  const isFilteredFeaturesActive =
    switcher === 'buildings' && filteredBuildingsFeatures.length > 0

  const geojson = {
    type: 'FeatureCollection',
    features: filteredBuildingsFeatures,
  }

  return (
    <>
      <Source id='filteredBuildingsSource' type='geojson' data={geojson}>
        <Layer
          id='filteredBuildings'
          type='fill'
          paint={{
            'fill-color': getFillColor(),
            'fill-outline-color': 'rgba(256,256,256,1)',
            'fill-opacity': getFillOpacity(),
          }}
          beforeId='poi-label'
          layout={{
            visibility: isFilteredFeaturesActive ? 'visible' : 'none',
          }}
        />
      </Source>

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
      </Source>

      <BuildingsPanel
        activeBuildingId={clickedFeature?.properties?.EGRID_CENT}
      />
    </>
  )
}

export default BuildingsMode
