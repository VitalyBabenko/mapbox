import { useMemo } from 'react'
import { Layer, Source } from 'react-map-gl'

const BuildingsLayer = props => {
  const { building, hoverBuilding, county, filterSearch } = props
  const sourceLayer = 'CAD_BATIMENT_HORSOL_WGS84-ack86c'
  const hoverBuildingId = hoverBuilding?.properties?.EGID
  const filterForHoverBuilding = useMemo(
    () => ['in', 'EGID', hoverBuildingId],
    [hoverBuildingId],
  )

  const activeBuildingId = building?.properties?.EGID
  const filterForActiveBuilding = useMemo(
    () => ['in', 'EGID', activeBuildingId],
    [activeBuildingId],
  )

  const countyName = county?.properties?.gdname || ''

  let countyFilter = ['match', ['get', 'COMMUNE'], countyName, true, false]

  if (countyName?.[0] === '[') {
    countyFilter = [
      'match',
      ['get', 'COMMUNE'],
      JSON.parse(countyName),
      true,
      false,
    ]
  }

  return (
    <Source id='buildingsSource' type='vector' url='mapbox://lamapch.02cb199k'>
      <Layer
        id='buildings'
        type='fill'
        source-layer={sourceLayer}
        paint={{
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': '#006cd5',
          'fill-opacity': 0.4,
        }}
        filter={countyFilter}
        beforeId='poi-label'
      />

      {hoverBuilding && (
        <Layer
          id='hoverBuilding'
          type='fill'
          source-layer={sourceLayer}
          paint={{
            'fill-color': '#006cd5',
            'fill-opacity': 0.6,
          }}
          filter={filterForHoverBuilding}
          beforeId='poi-label'
        />
      )}

      {building && (
        <Layer
          id='activeBuilding'
          type='fill'
          source-layer={sourceLayer}
          paint={{
            'fill-color': '#ed0e2c',
            'fill-opacity': 0.6,
          }}
          filter={filterForActiveBuilding}
          beforeId='poi-label'
        />
      )}

      {filterSearch.length > 0 && (
        <Layer
          id='buildingsByFilter'
          type='fill'
          source-layer={sourceLayer}
          filter={['in', 'EGRID_CENT', ...filterSearch]}
          paint={{
            'fill-color': '#ed0e2c',
            'fill-opacity': 0.6,
            'fill-outline-color': 'white',
          }}
          beforeId='poi-label'
        />
      )}
    </Source>
  )
}

export default BuildingsLayer
