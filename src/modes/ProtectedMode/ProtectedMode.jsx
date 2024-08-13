import { Layer, Source, useMap } from 'react-map-gl'
import { MODES, PROTECTED_SOURCE } from '../../constants'
import HoverProtected from './HoverProtected/HoverProtected'
import { useModeStore } from '../../store'

const ProtectedMode = ({ isActive }) => {
  const { current: map } = useMap()
  const { switcher } = useModeStore()

  const filter =
    switcher === MODES.PLOTS
      ? ['==', ['get', 'NAT_OBJET'], 'Parcelle']
      : ['==', ['get', 'NAT_OBJET'], 'Maison, immeuble']

  return (
    <Source id={PROTECTED_SOURCE.id} type='vector' url={PROTECTED_SOURCE.url}>
      <Layer
        id='protectedBuildings'
        type='fill'
        source-layer={PROTECTED_SOURCE.sourceLayer}
        paint={{
          'fill-outline-color': '#601f1e',
          'fill-color': '#c23e3b',
          'fill-opacity': 0.4,
        }}
        filter={filter}
        layout={{ visibility: isActive ? 'visible' : 'none' }}
        beforeId='poi-label'
      />
      <HoverProtected isActive={isActive} map={map} />
    </Source>
  )
}

export default ProtectedMode
