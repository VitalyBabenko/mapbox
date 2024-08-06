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
import { useFilterStore } from './store'

function App() {
  const mapRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { mode } = useModeStore(state => state)
  const { setAllCountiesFeatures, allCountiesFeatures } = useFilterStore(
    state => state,
  )
  const { setClickEvent, setHoverEvent } = useEventStore(state => state)

  const onMouseEnter = useCallback(() => setCursor('pointer'), [])
  const onMouseLeave = useCallback(() => setCursor(null), [])

  const onHover = useCallback(
    event => {
      if (isMapLoading) return
      setHoverEvent(event)
    },
    [mode, isMapLoading],
  )

  const onClick = useCallback(
    event => {
      if (isMapLoading) return
      setClickEvent(event)
    },
    [mode, isMapLoading],
  )

  const onMapLoad = () => {
    setIsMapLoading(false)
  }

  const onSourceDataLoad = event => {
    if (event.sourceId !== COUNTIES_SOURCE.id) return
    if (allCountiesFeatures.length === 52) return

    const result = mapRef.current?.querySourceFeatures(COUNTIES_SOURCE.id, {
      layer: 'counties',
      sourceLayer: COUNTIES_SOURCE.sourceLayer,
      validate: false,
    })

    setAllCountiesFeatures(result)
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
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={['counties', 'plots', 'buildings']}
      mapStyle={MAP_STYLES[0].url}
      attributionControl={false}
      initialViewState={{
        latitude: INITIAL_VIEW.LATITUDE,
        longitude: INITIAL_VIEW.LONGITUDE,
        zoom: INITIAL_VIEW.ZOOM,
      }}
    >
      {isMapLoading ? (
        <Loader withBackground />
      ) : (
        <>
          <CountiesMode isActive={mode === MODES.COUNTIES} />
          <PlotsMode isActive={mode === MODES.PLOTS} />
          <BuildingsMode isActive={mode === MODES.BUILDINGS} />
        </>
      )}

      <ModeSwitcher />
      <FiltersPanel />
      <MapDataPanel mapRef={mapRef} />
      <FullscreenControl position='top-right' />
      <NavigationControl />
    </Map>
  )
}

export default memo(App)
