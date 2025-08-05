import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { useEffect, useRef, useState } from 'react'
import globalStyle from './styles/global.module.scss'
import { TagsModal, Toast } from './components'
import { INITIAL_VIEW, INTERACTIVE_LAYER_IDS, MAP_STYLES } from './constants'

import { useModeStore, useZoneStore } from './store'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { ProtectedMode, ZonesMode } from './modes/index.js'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocaleStore } from './store/localeStore.js'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import { useMouseEvents } from './hooks'

function App() {
  const mapRef = useRef(null)
  const wrapperRef = useRef(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { toggleSwitcher } = useModeStore()
  const { isPrimary: isZonesPrimary } = useZoneStore()
  const { initializeLocale } = useLocaleStore()
  const mouse = useMouseEvents(isMapLoading)

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

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current)
      }
    }
  }, [])

  useEffect(() => {
    initializeLocale()
  }, [initializeLocale])

  return (
    <BrowserRouter>
      <div ref={wrapperRef} className={globalStyle.appWrapper}>
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
          <AppRoutes isMapLoading={isMapLoading} />

          <ProtectedMode />
          <ZonesMode isZonesPrimary={isZonesPrimary} />
          <TagsModal />
          <FullscreenControl position='top-right' />
          <NavigationControl />
          <Toast />
          <Sidebar />
        </Map>
      </div>
    </BrowserRouter>
  )
}

export default App
