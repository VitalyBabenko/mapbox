import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import globalStyle from './styles/global.module.scss'
import { TagsModal, Toast } from './components'
import { INITIAL_VIEW, INTERACTIVE_LAYER_IDS, MAP_STYLES } from './constants'

import { useEventStore, useModeStore, useZoneStore } from './store'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes.jsx'
import { ProtectedMode, ZonesMode } from './modes/index.js'
import 'react-datepicker/dist/react-datepicker.css'
import { useLocaleStore } from './store/localeStore.js'

function App() {
  const mapRef = useRef(null)
  const wrapperRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { toggleSwitcher } = useModeStore()
  const { setClickEvent, setHoverEvent, setClickedFeature, setHoveredFeature } =
    useEventStore()
  const { isPrimary: isZonesPrimary } = useZoneStore()
  const { initializeLocale } = useLocaleStore()

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
          onClick={onClick}
          onMouseMove={onHover}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onLoad={onMapLoad}
          cursor={cursor}
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
        </Map>
      </div>
    </BrowserRouter>
  )
}

export default memo(App)
