import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { INITIAL_VIEW, MAP_STYLES, MODES } from './constants/index.js'
import ModeSwitcher from './components/ModeSwitcher/ModeSwitcher.jsx'
import { useEventStore } from './store/eventStore.js'
import { useModeStore } from './store/modeStore.js'
import CountiesMode from './modes/CountiesMode/CountiesMode.jsx'
import PlotsMode from './modes/PlotsMode/PlotsMode.jsx'
import BuildingsMode from './modes/BuildingsMode/BuildingsMode.jsx'
import Loader from './components/Loader/Loader.jsx'
import { FiltersPanel, MapDataPanel } from './panels/index.js'
import { useZoneStore } from './store'
import Toast from './components/Toast/Toast.jsx'
import ZonesMode from './modes/ZonesMode/ZonesMode.jsx'
import ProtectedMode from './modes/ProtectedMode/ProtectedMode.jsx'
import globalStyle from './styles/global.module.scss'
import TagsModal from './components/TagsModal/TagsModal.jsx'

function App() {
  const mapRef = useRef(null)
  const wrapperRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { locale, setLocale, mode, toggleSwitcher } = useModeStore()
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
    const pathname = window.location.pathname

    if (pathname.includes('/buildings')) {
      toggleSwitcher()
    }
  }

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize()
      }
    }

    const observer = new ResizeObserver(() => {
      handleResize()
    })

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    const lang = document.querySelector('html').lang

    if (!['en', 'fr', 'de'].includes(locale)) {
      setLocale('en')
    }

    setLocale(lang)

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current)
      }
    }
  }, [])

  return (
    <div ref={wrapperRef} className={globalStyle.appWrapper}>
      <Map
        ref={mapRef}
        onClick={onClick}
        onMouseMove={onHover}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onLoad={onMapLoad}
        cursor={cursor}
        interactiveLayerIds={[
          'counties',
          'plots',
          'buildings',
          'protected',
          'filteredPlots',
          'clusters',
          'filteredPlots',
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

        <TagsModal />
        <ModeSwitcher />
        <FiltersPanel />
        <MapDataPanel />
        <FullscreenControl position='top-right' />
        <NavigationControl />
        <Toast />
      </Map>
    </div>
  )
}

export default memo(App)
