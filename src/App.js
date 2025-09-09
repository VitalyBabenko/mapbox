import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { useEffect, useRef, useState } from 'react'
import globalStyle from './styles/global.module.scss'
import { TagsModal, Toast, Sidebar, Drawer, Header } from './components'
import { INITIAL_VIEW, INTERACTIVE_LAYER_IDS, MAP_STYLES } from './constants'

import { useModeStore, useZoneStore, useLocaleStore } from './store'
import { useDrawer } from './hooks'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { ProtectedMode, ZonesMode } from './modes/index.js'
import 'react-datepicker/dist/react-datepicker.css'

import { useMouseEvents, useVisibleFeatures } from './hooks'
import CountyStatsButton from './panels/CountyStatsPanel/CountyStatsButton/CountyStatsButton'

function App() {
  // Initialize Drawer click handling globally
  useDrawer()
  const mapRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { toggleSwitcher } = useModeStore()
  const { isPrimary: isZonesPrimary } = useZoneStore()
  const { initializeLocale } = useLocaleStore()
  const mouse = useMouseEvents(isMapLoading)
  useVisibleFeatures(mapRef.current)

  const onMapLoad = () => {
    const pathname = window.location.pathname
    if (pathname.includes('/buildings')) {
      toggleSwitcher()
    }
    setIsMapLoading(false)
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

    const currentWrapper = wrapperRef.current
    if (currentWrapper) {
      observer.observe(currentWrapper)
    }

    return () => {
      if (currentWrapper) {
        observer.unobserve(currentWrapper)
      }
    }
  }, [])

  useEffect(() => {
    initializeLocale()
  }, [initializeLocale])

  return (
    <BrowserRouter>
      <div ref={wrapperRef} className={globalStyle.appWrapper}>
        <Header />
        <Toast />
        <Map
          ref={mapRef}
          cursor={mouse.cursor}
          onClick={mouse.onClick}
          onMouseMove={mouse.onMove}
          onMouseEnter={mouse.onEnter}
          onMouseLeave={mouse.onLeave}
          onLoad={onMapLoad}
          interactiveLayerIds={[
            ...INTERACTIVE_LAYER_IDS,
            isZonesPrimary ? 'zones' : '',
            'tagsLayer',
            'bookmarksLayer',
            'notesLayer',
            'alertsLayer',
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
          <CountyStatsButton />
          <AppRoutes isMapLoading={isMapLoading} />

          <ProtectedMode />
          <ZonesMode isZonesPrimary={isZonesPrimary} />
          <TagsModal />
          <FullscreenControl position='top-right' />
          <NavigationControl />
        </Map>

        <Sidebar map={mapRef.current} />
        <Drawer />
      </div>
    </BrowserRouter>
  )
}

export default App
