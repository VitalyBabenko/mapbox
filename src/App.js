import { FullscreenControl, Map, NavigationControl } from 'react-map-gl'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import globalStyle from './styles/global.module.scss'
import { plotService } from './service/plotService.js'
import { Loader, TagsModal, Toast } from './components'
import { INITIAL_VIEW, MAP_STYLES } from './constants'

import {
  useEventStore,
  useModeStore,
  useTagsStore,
  useBookmarksStore,
  useZoneStore,
  useAlertsStore,
} from './store'
import MainPage from './pages/MainPage/MainPage.jsx'
import TagsPage from './pages/TagsPage/TagsPage.jsx'
import BookmarksPage from './pages/BookmarksPage/BookmarksPage.jsx'
import AlertsPage from './pages/AlertsPage/AlertsPage.jsx'

function App() {
  const mapRef = useRef(null)
  const wrapperRef = useRef(null)
  const [cursor, setCursor] = useState(null)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const { locale, setLocale, mode, toggleSwitcher } = useModeStore()
  const { setClickEvent, setHoverEvent, setClickedFeature, setHoveredFeature } =
    useEventStore()
  const { isPrimary: isZonesPrimary, isActive: isZonesActive } = useZoneStore()
  const { setPlotsWithTags } = useTagsStore()
  const { setPlotsWithBookmarks } = useBookmarksStore()
  const { setPlotsWithAlerts } = useAlertsStore()
  const pathname = window.location.pathname

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

  const getMarkedFeatures = async () => {
    const bookmarkedPlots = await plotService.getAllPlotsFeaturesWithBookmarks()
    setPlotsWithBookmarks(bookmarkedPlots)
    const taggedPlotsGeojson = await plotService.getAllPlotsFeaturesWithTags()
    setPlotsWithTags(taggedPlotsGeojson)
    const alertedPlots = await plotService.getAllPlotsFeaturesWithAlerts()
    setPlotsWithAlerts(alertedPlots)
  }

  const onMapLoad = () => {
    getMarkedFeatures()

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
          'filteredBuildings',
          'taggedPlots',
          'bookmarkedPlots',
          'pools',
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

        {pathname === '/explore/map/plots' ? (
          <MainPage
            isMapLoading={isMapLoading}
            isZonesActive={isZonesActive}
            isZonesPrimary={isZonesPrimary}
            mode={mode}
          />
        ) : null}

        {pathname === '/explore/map/tags' ? (
          <TagsPage
            isMapLoading={isMapLoading}
            isZonesActive={isZonesActive}
            isZonesPrimary={isZonesPrimary}
            mode={mode}
          />
        ) : null}

        {pathname === '/explore/map/bookmarks' ? (
          <BookmarksPage
            isMapLoading={isMapLoading}
            isZonesActive={isZonesActive}
            isZonesPrimary={isZonesPrimary}
            mode={mode}
          />
        ) : null}

        {pathname === '/explore/map/alerts' ? (
          <AlertsPage
            isMapLoading={isMapLoading}
            isZonesActive={isZonesActive}
            isZonesPrimary={isZonesPrimary}
            mode={mode}
          />
        ) : null}

        <TagsModal />
        <FullscreenControl position='top-right' />
        <NavigationControl />
        <Toast />
      </Map>
    </div>
  )
}

export default memo(App)
