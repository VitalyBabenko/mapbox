import { Map } from "react-map-gl";
import { memo, useCallback, useRef, useState } from "react";
import MapControls from "./components/MapControls/MapControls.jsx";
import { INITIAL_VIEW } from "./constants/index.js";
import CountiesLayer from "./components/CountiesLayer/CountiesLayer.jsx";
import BuildingLayer from "./components/BuildingsLayer/BuildingsLayer.jsx";
import BuildingPanel from "./components/BuildingPanel/BuildingPanel.jsx";

function App() {
  const mapRef = useRef(null);
  const [county, setCounty] = useState(null);
  const [hoverCounty, setHoverCounty] = useState(null);
  const [building, setBuilding] = useState(null);
  const [hoverBuilding, setHoverBuilding] = useState(null);

  const onHover = useCallback((event) => {
    const feature = event?.features[0];
    if (!feature) return;
    if (feature?.source === "counties") setHoverCounty(feature);
    if (feature?.source === "buildings") setHoverBuilding(feature);
  }, []);

  const onClick = useCallback((event) => {
    const feature = event?.features[0];
    if (!feature) return;
    if (feature?.source === "counties") setCounty(feature);
    if (feature?.source === "buildings") setBuilding(feature);
  }, []);

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v10"
      interactiveLayerIds={["countiesFill", "buildingsFill"]}
      attributionControl={false}
      initialViewState={{
        latitude: INITIAL_VIEW.LATITUDE,
        longitude: INITIAL_VIEW.LONGITUDE,
        zoom: INITIAL_VIEW.ZOOM,
      }}
    >
      <MapControls mapRef={mapRef} county={county} setCounty={setCounty} />

      <CountiesLayer hoverCounty={hoverCounty} county={county} />

      <BuildingLayer
        county={county}
        building={building}
        hoverBuilding={hoverBuilding}
      />

      <BuildingPanel building={building} setBuilding={setBuilding} />
    </Map>
  );
}

export default memo(App);
