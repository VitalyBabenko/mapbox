import { Layer, Popup, Source } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../constants'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import getBuildingHoverPopupText from '../../utils/getBuildingHoverPopup'

const BuildingsMode = ({ isActive }) => {
  const { county, switcher } = useModeStore()
  const { clickedFeature, hoveredFeature, hoverEvent } = useEventStore()
  const { activePaint, opacity } = usePaintStore()
  const { filtersResult } = useFilterStore()
  const isSearch = Boolean(filtersResult?.length)

  const buildingsFilter = [
    'match',
    ['get', 'NO_COMM'],
    county?.properties?.NO_COMM || '',
    true,
    false,
  ]

  const getFillOpacity = () => {
    const hoverOpacity = Math.min((opacity[1] + 40) / 100, 1)
    const baseOpacity = opacity[1] / 100
    const highlightedOpacity = Math.min(baseOpacity + 0.7, 1)

    const searchedEgids = isSearch
      ? filtersResult.map(f => f?.properties?.EGID?.trim?.()).filter(Boolean)
      : []

    const hoveredEgid = hoveredFeature?.properties?.EGID?.trim?.()

    if (!searchedEgids.length && !hoveredEgid) {
      return baseOpacity
    }

    const opacityCase = ['match', ['get', 'EGID']]

    searchedEgids.forEach(id => {
      opacityCase.push(id, highlightedOpacity)
    })

    if (hoveredEgid) {
      opacityCase.push(hoveredEgid, hoverOpacity)
    }

    opacityCase.push(baseOpacity)

    return opacityCase
  }

  // const getFillOpacity = () => {
  //   const hoverOpacity = (opacity[1] + 40) / 100
  //   if (hoveredFeature?.properties?.EGID) {
  //     return [
  //       'case',
  //       ['==', ['get', 'EGID'], hoveredFeature?.properties?.EGID],
  //       hoverOpacity > 1 ? 1 : hoverOpacity,
  //       opacity[1] / 100,
  //     ]
  //   }
  //   return opacity[1] / 100
  // }

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
    switcher === 'buildings' && filtersResult?.[0]?.properties?.EGID

  const geojson = {
    type: 'FeatureCollection',
    features: filtersResult,
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
    </>
  )
}

export default BuildingsMode
