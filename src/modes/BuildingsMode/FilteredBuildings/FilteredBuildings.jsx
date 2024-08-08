import React from 'react'
import { useFilterStore } from '../../../store'

const FilteredBuildings = () => {
  const { filteredBuildingsIds } = useFilterStore()

  console.log(filteredBuildingsIds)

  return <div>FilteredBuildings</div>
}

export default FilteredBuildings
