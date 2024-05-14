import Map, {
  FullscreenControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";
import style from "./MapScreen.module.scss";
import { data } from "../../data/genevaBoundaries.js";
import { useCallback, useMemo, useState } from "react";
import {
  countiesFillLayer,
  highlightCountiesFillLayer,
} from "../../data/layers.js";

const initialView = {
  longitude: 6.143724445834019,
  latitude: 46.203988837044086,
  zoom: 10.5,
};

const MapScreen = () => {
  const [hoverInfo, setHoverInfo] = useState();

  const onHover = useCallback((event) => {
    const county = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      countyName: county && county.properties.gdname,
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || "";

  const filter = useMemo(
    () => ["in", "gdname", selectedCounty],
    [selectedCounty]
  );

  return (
    <div className={style.screen}>
      <Map
        onMouseMove={onHover}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v10"
        initialViewState={initialView}
        interactiveLayerIds={["countiesFill"]}
        attributionControl={false}
      >
        <FullscreenControl className={style.button} position="top-left" />
        <NavigationControl />

        <Source id="counties" type="geojson" data={data}>
          <Layer id="countiesFill" {...countiesFillLayer} />
          <Layer {...highlightCountiesFillLayer} filter={filter} />
        </Source>
      </Map>
    </div>
  );
};

export default MapScreen;
