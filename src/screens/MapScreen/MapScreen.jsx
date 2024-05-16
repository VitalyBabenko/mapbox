import Map, { Layer, Source } from "react-map-gl";
import { data } from "../../data/genevaBoundaries.js";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  countiesFillLayer,
  highlightCountiesFillLayer,
} from "../../data/layers.js";
import bbox from "@turf/bbox";
import MapControls from "../../components/MapControls/MapControls.jsx";
import { initialView } from "../../constants/index.js";

const MapScreen = () => {
  const mapRef = useRef(null);
  const [hoverInfo, setHoverInfo] = useState();
  const [county, setCounty] = useState(null);

  const onHover = useCallback((event) => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county && county.properties.gdname,
    });
  }, []);

  const onClick = (event) => {
    const feature = event.features[0];
    if (!feature) return;

    const [minLng, minLat, maxLng, maxLat] = bbox(feature);

    mapRef.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 40, duration: 1000 }
    );

    setCounty(feature);
  };

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || "";

  const filter = useMemo(
    () => ["in", "gdname", selectedCounty],
    [selectedCounty]
  );

  return (
    <Map
      ref={mapRef}
      onClick={onClick}
      onMouseMove={onHover}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/light-v10"
      initialViewState={initialView}
      interactiveLayerIds={["countiesFill"]}
      attributionControl={false}
    >
      <MapControls county={county} setCounty={setCounty} mapRef={mapRef} />

      {!county && (
        <Source id="counties" type="geojson" data={data}>
          <Layer id="countiesFill" {...countiesFillLayer} />
          <Layer {...highlightCountiesFillLayer} filter={filter} />
        </Source>
      )}
    </Map>
  );
};

export default MapScreen;
