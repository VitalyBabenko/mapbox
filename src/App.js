import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { memo, useCallback, useRef, useState } from 'react'
import {
  COUNTIES_SOURCE,
  INITIAL_VIEW,
  MAP_STYLES,
  MODES,
} from './constants/index.js'
import ModeSwitcher from './components/ModeSwitcher/ModeSwitcher.jsx'
import { useEventStore } from './store/eventStore.js'
import { useModeStore } from './store/modeStore.js'
import CountiesMode from './modes/CountiesMode/CountiesMode.jsx'
import PlotsMode from './modes/PlotsMode/PlotsMode.jsx'
import BuildingsMode from './modes/BuildingsMode/BuildingsMode.jsx'
import Loader from './components/Loader/Loader.jsx'
import { FiltersPanel, MapDataPanel } from './panels/index.js'
import { useFilterStore, useZoneStore } from './store'
import Toast from './components/Toast/Toast.jsx'
import ZonesMode from './modes/ZonesMode/ZonesMode.jsx'
import ProtectedMode from './modes/ProtectedMode/ProtectedMode.jsx'

function App() {
  const mapRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { mode } = useModeStore()
  const { setAllCountiesFeatures, allCountiesFeatures } = useFilterStore()
  const { setClickEvent, setHoverEvent, setClickedFeature, setHoveredFeature } =
    useEventStore()
  const { isPrimary: isZonesPrimary, isActive: isZonesActive } = useZoneStore()

  const onMouseEnter = function () {
    setCursor('pointer')
  }

  const onMouseLeave = useCallback(() => setCursor(null), [])

  const onHover = event => {
    if (isMapLoading) return
    setHoverEvent(event)
    const feature = event?.features?.[0]
    if (feature) {
      setHoveredFeature(event?.features?.[0])
    } else {
      setHoveredFeature(null)
    }
  }

  const onClick = event => {
    if (isMapLoading) return
    setClickEvent(event)
    const feature = event?.features?.[0]
    if (feature) {
      setClickedFeature(event?.features?.[0])
    } else {
      setClickedFeature(null)
    }
  }

  const onMapLoad = () => {
    setIsMapLoading(false)
  }

  const onSourceDataLoad = event => {
    if (event.sourceId !== COUNTIES_SOURCE.id) return
    if (allCountiesFeatures?.length === 52) return

    const result = mapRef.current?.querySourceFeatures(COUNTIES_SOURCE.id, {
      layer: 'counties',
      sourceLayer: COUNTIES_SOURCE.sourceLayer,
      validate: false,
    })

    setAllCountiesFeatures(result)
  }

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onLoad={onMapLoad}
      onSourceData={onSourceDataLoad}
      cursor={cursor}
      interactiveLayerIds={[
        'counties',
        'plots',
        'buildings',
        'protected',
        'clusters',
        isZonesPrimary ? 'zones' : '',
      ]}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={MAP_STYLES[0].url}
      attributionControl={false}
      initialViewState={{
        latitude: INITIAL_VIEW.LATITUDE,
        longitude: INITIAL_VIEW.LONGITUDE,
        zoom: INITIAL_VIEW.ZOOM,
      }}
    >
      {isMapLoading && <Loader withBackground />}

      <CountiesMode isActive={getIsModeActive(MODES.COUNTIES)} />
      <PlotsMode isActive={getIsModeActive(MODES.PLOTS)} />
      <BuildingsMode isActive={getIsModeActive(MODES.BUILDINGS)} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
      <ZonesMode />

      <ModeSwitcher />
      <FiltersPanel />
      <MapDataPanel />
      <FullscreenControl position='top-right' />
      <NavigationControl />
      <Toast />
    </Map>
  )
}

export default memo(App)
