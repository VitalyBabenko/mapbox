import { FullscreenControl, NavigationControl, useMap } from "react-map-gl";
import GeocoderControl from "../GeocoderControl/GeocoderControl";
import style from "./MapControls.module.scss";
import { INITIAL_VIEW } from "../../constants";
import MapDataPanel from "../MapDataPanel/MapDataPanel";

const MapControls = (props) => {
  const { county, setCounty, setPlot, mapRef } = props;
  const { current: map } = useMap();

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    });
    setCounty(null);
    setPlot(null);
  };

  return (
    <>
      <FullscreenControl position="top-right" />

      <NavigationControl />

      {/* <GeocoderControl
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        position="top-left"
      /> */}

      <MapDataPanel mapRef={mapRef} />

      {county && (
        <button onClick={resetView} className={style.resetViewBtn}>
          Reset view
        </button>
      )}
    </>
  );
};

export default MapControls;
