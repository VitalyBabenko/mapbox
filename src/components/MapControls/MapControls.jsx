import { FullscreenControl, NavigationControl, useMap } from 'react-map-gl'
import GeocoderControl from '../GeocoderControl/GeocoderControl'
import style from './MapControls.module.scss'
import { INITIAL_VIEW } from '../../constants'
import MapDataPanel from '../MapDataPanel/MapDataPanel'

const MapControls = props => {
  const {
    county,
    setCounty,
    setPlot,
    mapRef,
    mode,
    setMode,
    setBuilding,
    setFilterSearch,
  } = props
  const { current: map } = useMap()

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
    setCounty(null)
    setPlot(null)
    setBuilding(null)
    setFilterSearch([])
  }

  const handleToggleMode = () => {
    setMode(mode === 'buildings' ? 'plots' : 'buildings')
  }

  return (
    <>
      <button onClick={handleToggleMode} className={style.toggleModeBtn}>
        <span className={mode === 'buildings' ? style.active : ''}>
          Buildings
        </span>

        <span className={mode === 'plots' ? style.active : ''}>Plots</span>
      </button>

      <FullscreenControl position='top-right' />

      <NavigationControl />

      <MapDataPanel mapRef={mapRef} />

      {county && (
        <button onClick={resetView} className={style.resetViewBtn}>
          Reset view
        </button>
      )}
    </>
  )
}

export default MapControls
