import React from 'react'
import { useFilterStore } from '../../../store'
import { Layer } from 'react-map-gl'
import { BUILDINGS_SOURCE } from '../../../constants'

const FilteredBuildings = ({ isActive }) => {
  const { filteredBuildingsIds } = useFilterStore()

  const filter = ['in', 'EGRID_CENT', ...filteredBuildingsIds]

  return (
    <Layer
      id='filteredBuildings'
      type='fill'
      source={BUILDINGS_SOURCE.id}
      source-layer={BUILDINGS_SOURCE.sourceLayer}
      filter={filter}
      paint={{
        'fill-color': '#ed0e2c',
        'fill-opacity': 0.6,
      }}
      beforeId='poi-label'
      layout={{ visibility: isActive ? 'visible' : 'none' }}
    />
  )
}

export default FilteredBuildings
