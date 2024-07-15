import { Map } from 'react-map-gl'
import { memo, useCallback, useRef, useState } from 'react'
import MapControls from './components/MapControls/MapControls.jsx'
import { INITIAL_VIEW, MAP_STYLES } from './constants/index.js'
import CountiesLayer from './components/CountiesLayer/CountiesLayer.jsx'
import PlotsLayer from './components/PlotsLayer/PlotsLayer.jsx'
import PlotsPanel from './components/PlotsPanel/PlotsPanel.jsx'
import PlotsFilters from './components/PlotsFilters/PlotsFilters.jsx'
import PlotsByFilter from './components/PlotsByFilters/PlotsByFilter.jsx'
import BuildingsLayer from './components/BuildingsLayer/BuildingsLayer.jsx'
import BuildingsPanel from './components/BuildingsPanel/BuildingsPanel.jsx'

function App() {
  const mapRef = useRef(null)
  const [mode, setMode] = useState('plots')
  const [cursor, setCursor] = useState(null)

  const [clickEvent, setClickEvent] = useState(null)
  const [hoverEvent, setHoverEvent] = useState(null)

  // const [clickInfo, setClickInfo] = useState(null)
  // const [hoverInfo, setHoverInfo] = useState(null)

  // county state
  const [county, setCounty] = useState(null)
  const [hoverCounty, setHoverCounty] = useState(null)

  // plot state
  const [plot, setPlot] = useState(null)
  const [hoverPlot, setHoverPlot] = useState(null)

  // building state
  const [building, setBuilding] = useState(null)
  const [hoverBuilding, setHoverBuilding] = useState(null)

  // filter state
  const [filterSearchPlots, setFilterSearchPlot] = useState([])

  const onMouseEnter = useCallback(() => setCursor('pointer'), [])
  const onMouseLeave = useCallback(() => setCursor(null), [])

  const getRenderedFeatures = (point, layers) =>
    mapRef.current?.queryRenderedFeatures(point, { layers })[0]

  const onHover = useCallback(
    event => {
      setHoverEvent(event)
      if (!county) {
        const countyFeature = getRenderedFeatures(event.point, ['counties'])
        setHoverCounty(countyFeature)
        return
      }

      if (mode === 'plots') {
        const plotFeature = getRenderedFeatures(event.point, ['plots'])
        setHoverPlot(plotFeature)
        return
      }

      if (mode === 'buildings') {
        const buildingFeature = getRenderedFeatures(event.point, ['buildings'])
        setHoverBuilding(buildingFeature)
      }
    },
    [county, mode],
  )

  const onClick = useCallback(
    event => {
      setClickEvent(event)
      if (!county) {
        const countyFeature = getRenderedFeatures(event.point, ['counties'])
        setCounty(countyFeature)
        return
      }

      if (mode === 'plots') {
        const plotFeature = getRenderedFeatures(event.point, ['plots'])
        setPlot(plotFeature)
        return
      }

      if (mode === 'buildings') {
        const buildingFeature = getRenderedFeatures(event.point, ['buildings'])
        setBuilding(buildingFeature)
      }
    },
    [county, mode],
  )

  const onSetFilters = newFilters => {
    setFilterSearchPlot(newFilters)
  }

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
    >
      <CountiesLayer
        mapRef={mapRef}
        hoverCounty={hoverCounty}
        filterSearchPlots={filterSearchPlots}
        county={county}
        hoverEvent={hoverEvent}
      />

      {mode === 'plots' && (
        <>
          <PlotsFilters onSetFilters={onSetFilters} />
          <PlotsLayer county={county} hoverPlot={hoverPlot} plot={plot} />
          <PlotsPanel plot={plot} setPlot={setPlot} />
          <PlotsByFilter filterSearchPlots={filterSearchPlots} />
        </>
      )}

      {mode === 'buildings' && (
        <>
          <BuildingsLayer
            county={county}
            building={building}
            hoverBuilding={hoverBuilding}
          />
          <BuildingsPanel building={building} setBuilding={setBuilding} />
        </>
      )}

      <MapControls
        mapRef={mapRef}
        county={county}
        setCounty={setCounty}
        setPlot={setPlot}
        setBuilding={setBuilding}
        mode={mode}
        setMode={setMode}
      />
    </Map>
  )
}

export default memo(App)
