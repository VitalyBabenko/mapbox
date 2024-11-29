import { Layer, Source } from 'react-map-gl'
import { MODES, POOLS_SOURCE } from '../../constants'
import { useModeStore } from '../../store'

const PoolsLayer = () => {
  const { mode, county } = useModeStore()

  const getIsActive = () => {
    if (mode === MODES.PLOTS) return true
    if (mode === MODES.BUILDINGS) return true
    return false
  }

  const poolsFilter = [
    'all',
    [
      'match',
      ['get', 'MUTCOM'],
      [county?.properties?.NO_COMM || ''],
      true,
      false,
    ],
  ]

  return (
    <Source id={POOLS_SOURCE.id} type='vector' url={POOLS_SOURCE.url}>
      <Layer
        id='pools'
        type='fill'
        source={POOLS_SOURCE.id}
        source-layer={POOLS_SOURCE.sourceLayer}
        filter={poolsFilter}
        paint={{
          'fill-color': '#006cd5',
          'fill-outline-color': '#337f5f',
          'fill-opacity': 0.6,
        }}
        layout={{
          visibility: getIsActive() ? 'visible' : 'none',
        }}
      />
    </Source>
  )
}

export default PoolsLayer
