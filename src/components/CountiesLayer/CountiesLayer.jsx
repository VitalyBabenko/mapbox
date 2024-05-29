import { Layer, Source, useMap } from "react-map-gl";
import { useEffect, useState } from "react";
import bbox from "@turf/bbox";

const CountiesLayer = ({ hoverCounty, county }) => {
  const { current: map } = useMap();
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const hoverCountyId = hoverCounty?.properties?.genid;
  const filterForHoverCounty = ["in", "genid", hoverCountyId];

  useEffect(() => {
    if (!county) return;
    const [minLng, minLat, maxLng, maxLat] = bbox(county);
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500 }
    );
  }, [county]);

  useEffect(() => {
    const handleMapLoaded = () => {
      setIsStyleLoaded(true);
    };
    map.on("style.load", handleMapLoaded);

    return () => {
      map.off("style.load", handleMapLoaded);
    };
  }, []);

  return (
    <Source id="countiesSource" type="vector" url="mapbox://lamapch.9a3g6tja">
      {isStyleLoaded && (
        <Layer
          id="counties"
          type="fill"
          source-layer="kanton_28-filt_reworked-a2cfbe"
          paint={{
            "fill-outline-color": "rgba(256,256,256,1)",
            "fill-color": "#2D73C5",
            "fill-opacity": 0.6,
          }}
          beforeId="admin-1-boundary"
          layout={{ visibility: county ? "none" : "visible" }}
        />
      )}

      {hoverCounty && (
        <Layer
          id="countiesHover"
          type="fill"
          source-layer="kanton_28-filt_reworked-a2cfbe"
          paint={{
            "fill-color": "#ed0e2c",
            "fill-opacity": 0.6,
          }}
          filter={filterForHoverCounty}
          beforeId="admin-1-boundary"
          layout={{ visibility: county ? "none" : "visible" }}
        />
      )}
    </Source>
  );
};

export default CountiesLayer;
