import React, { useState } from "react";
import { FullscreenControl, NavigationControl } from "react-map-gl";
import GeocoderControl from "../GeocoderControl/GeocoderControl";
import style from "./MapControls.module.scss";
import { initialView } from "../../constants";
import { ReactComponent as MapDataIcon } from "../../icons/mapData.svg";
import MapDataPanel from "../MapDataPanel/MapDataPanel";

const MapControls = ({ county, setCounty, mapRef }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const toggleDataPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const resetView = () => {
    setCounty(null);
    const map = mapRef.current.getMap();

    map.flyTo({
      center: [initialView.longitude, initialView.latitude],
      zoom: initialView.zoom,
      essential: true,
    });
  };

  return (
    <>
      <FullscreenControl position="top-right" />

      <NavigationControl />

      <GeocoderControl
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position="top-left"
      />

      <button onClick={toggleDataPanel} className={style.mapDataBtn}>
        <MapDataIcon />
        Maps & Data
      </button>

      {isPanelOpen && <MapDataPanel />}

      {county && (
        <button onClick={resetView} className={style.resetViewBtn}>
          Reset view
        </button>
      )}
    </>
  );
};

export default MapControls;
