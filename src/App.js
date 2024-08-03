import { Map } from 'react-map-gl'
import { memo, useCallback, useRef, useState } from 'react'
import MapControls from './components/MapControls/MapControls.jsx'
import { INITIAL_VIEW, MAP_STYLES, MODES } from './constants/index.js'
import ModeSwitcher from './components/ModeSwitcher/ModeSwitcher.jsx'
import { useEventStore } from './store/eventStore.js'
import { useModeStore } from './store/modeStore.js'
import CountiesMode from './modes/CountiesMode/CountiesMode.jsx'
import PlotsMode from './modes/PlotsMode/PlotsMode.jsx'
import BuildingsMode from './modes/BuildingsMode/BuildingsMode.jsx'
import Loader from './components/Loader/Loader.jsx'
import { FiltersPanel } from './panels/index.js'
import { useFilterStore } from './store'

function App() {
  const mapRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { mode } = useModeStore(state => state)
  const { setAllCountiesFeatures } = useFilterStore(state => state)
  const { setClickEvent, setHoverEvent } = useEventStore(state => state)

  // filter state
  const [filterSearch, setFilterSearch] = useState([])

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

  const onSetFilters = useCallback(newFilters => {
    setFilterSearch(newFilters)
  }, [])

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursor={cursor}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={['counties', 'plots', 'buildings']}
      mapStyle={MAP_STYLES[0].URL}
      attributionControl={false}
      initialViewState={{
        latitude: INITIAL_VIEW.LATITUDE,
        longitude: INITIAL_VIEW.LONGITUDE,
        zoom: INITIAL_VIEW.ZOOM,
      }}
      onLoad={() => {
        setIsMapLoading(false)
        setAllCountiesFeatures(
          mapRef.current?.querySourceFeatures('countySource', {
            layer: 'counties',
            sourceLayer: 'kanton_28-filt_reworked-a2cfbe',
            validate: false,
          }),
        )
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

      <FiltersPanel onSetFilters={onSetFilters} />
      <ModeSwitcher />

      <MapControls mapRef={mapRef} />
    </Map>
  )
}

export default memo(App)
