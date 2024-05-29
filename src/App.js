import { Map, useMap } from "react-map-gl";
import { memo, useCallback, useRef, useState } from "react";
import MapControls from "./components/MapControls/MapControls.jsx";
import { INITIAL_VIEW, MAP_STYLES } from "./constants/index.js";
import CountiesLayer from "./components/CountiesLayer/CountiesLayer.jsx";
import PlotsLayer from "./components/PlotsLayer/PlotsLayer.jsx";
import PlotsPanel from "./components/PlotsPanel/PlotsPanel.jsx";

function App() {
  const { current: map } = useMap();
  const mapRef = useRef(null);
  const [cursor, setCursor] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);

  // county state
  const [county, setCounty] = useState(null);
  const [hoverCounty, setHoverCounty] = useState(null);

  // plot state
  const [plot, setPlot] = useState(null);
  const [hoverPlot, setHoverPlot] = useState(null);

  const onMouseEnter = useCallback(() => setCursor("pointer"), []);
  const onMouseLeave = useCallback(() => setCursor(null), []);

  const getRenderedFeatures = (point, layers) =>
    mapRef.current?.queryRenderedFeatures(point, { layers })[0];

  const onHover = useCallback(
    ({ point }) => {
      if (!county) {
        const countyFeature = getRenderedFeatures(point, ["counties"]);
        setHoverCounty(countyFeature);
      } else {
        const plotFeature = getRenderedFeatures(point, ["plots"]);
        setHoverPlot(plotFeature);
      }
    },
    [county]
  );

  const onClick = useCallback(
    ({ point }) => {
      if (!county) {
        const countyFeature = getRenderedFeatures(point, ["counties"]);
        setCounty(countyFeature);
      } else {
        setPlot(getRenderedFeatures(point, ["plots"]));
      }
    },
    [county]
  );

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      cursor={cursor}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      interactiveLayerIds={["counties", "plots"]}
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
        county={county}
      />

      <PlotsLayer county={county} hoverPlot={hoverPlot} plot={plot} />

      <PlotsPanel plot={plot} setPlot={setPlot} />

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
