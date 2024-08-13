import { Layer } from 'react-map-gl'
import { useFilterStore } from '../../../store'
import { PLOTS_SOURCE } from '../../../constants'

const FilteredPlots = ({ isActive }) => {
  const { filteredPlotsIds } = useFilterStore()

  const filter = ['in', 'EGRID', ...filteredPlotsIds]

  return (
    <Layer
      id='filteredPlots'
      type='fill'
      source={PLOTS_SOURCE.id}
      source-layer={PLOTS_SOURCE.sourceLayer}
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

export default FilteredPlots
