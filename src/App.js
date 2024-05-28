import { Map } from "react-map-gl";
import { memo, useCallback, useRef, useState } from "react";
import MapControls from "./components/MapControls/MapControls.jsx";
import { INITIAL_VIEW } from "./constants/index.js";
import CountiesLayer from "./components/CountiesLayer/CountiesLayer.jsx";
import PlotsLayer from "./components/PlotsLayer/PlotsLayer.jsx";
import PlotsPanel from "./components/PlotsPanel/PlotsPanel.jsx";

function App() {
  const mapRef = useRef(null);
  const [cursor, setCursor] = useState(null);

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
      mapboxAccessToken={
        "pk.eyJ1IjoibGFtYXBjaCIsImEiOiJjbHVmdm5iM2ExdnYxMmpwaXc3YjRqZXppIn0.WVlyJH_BxjCWEkxhBYt5MQ"
      }
      interactiveLayerIds={["counties", "plots"]}
      mapStyle="mapbox://styles/lamapch/clwoz41jt011101r0bzo85ivl"
      attributionControl={false}
      initialViewState={{
        latitude: INITIAL_VIEW.LATITUDE,
        longitude: INITIAL_VIEW.LONGITUDE,
        zoom: INITIAL_VIEW.ZOOM,
      }}
    >
      <CountiesLayer hoverCounty={hoverCounty} county={county} />
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
