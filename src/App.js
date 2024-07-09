import { Map } from 'react-map-gl';
import { memo, useCallback, useRef, useState } from 'react';
import MapControls from './components/MapControls/MapControls.jsx';
import { INITIAL_VIEW, MAP_STYLES } from './constants/index.js';
import CountiesLayer from './components/CountiesLayer/CountiesLayer.jsx';
import PlotsLayer from './components/PlotsLayer/PlotsLayer.jsx';
import PlotsPanel from './components/PlotsPanel/PlotsPanel.jsx';
import PlotsFilters from './components/PlotsFilters/PlotsFilters.jsx';
import PlotsByFilter from './components/PlotsByFilters/PlotsByFilter.jsx';

function App() {
  const mapRef = useRef(null);
  const [cursor, setCursor] = useState(null);
  const [clickInfo, setClickInfo] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);

  // county state
  const [county, setCounty] = useState(null);
  const [hoverCounty, setHoverCounty] = useState(null);

  // plot state
  const [plot, setPlot] = useState(null);
  const [hoverPlot, setHoverPlot] = useState(null);

  // filter state
  const [filterSearchPlots, setFilterSearchPlot] = useState([]);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(null), []);

  const getRenderedFeatures = (point, layers) =>
    mapRef.current?.queryRenderedFeatures(point, { layers })[0];

  const onHover = useCallback(
    event => {
      setHoverInfo(event);
      if (!county) {
        const countyFeature = getRenderedFeatures(event.point, ['counties']);
        setHoverCounty(countyFeature);
      } else {
        const plotFeature = getRenderedFeatures(event.point, ['plots']);
        setHoverPlot(plotFeature);
      }
    },
    [county],
  );

  const onClick = useCallback(
    event => {
      setClickInfo(event);
      if (!county) {
        const countyFeature = getRenderedFeatures(event.point, ['counties']);
        setCounty(countyFeature);
      } else {
        setPlot(getRenderedFeatures(event.point, ['plots']));
      }
    },
    [county],
  );

  const onSetFilters = newFilters => {
    setFilterSearchPlot(newFilters);
  };

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursor={cursor}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={['counties', 'plots']}
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
        hoverInfo={hoverInfo}
      />

      <PlotsFilters onSetFilters={onSetFilters} />
      <PlotsLayer county={county} hoverPlot={hoverPlot} plot={plot} />
      <PlotsPanel plot={plot} setPlot={setPlot} />
      <PlotsByFilter filterSearchPlots={filterSearchPlots} />

      <MapControls
        mapRef={mapRef}
        county={county}
        setCounty={setCounty}
        setPlot={setPlot}
      />
    </Map>
  );
}

export default memo(App);
