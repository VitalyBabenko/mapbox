import { Layer, Source, useMap } from "react-map-gl";
import { useEffect } from "react";
import bbox from "@turf/bbox";

const CountiesLayer = ({ hoverCounty, county }) => {
  const { current: map } = useMap();
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

  if (county) return null;
  return (
    <Source id="countySource" type="vector" url="mapbox://lamapch.9a3g6tja">
      <Layer
        id="counties"
        type="fill"
        source-layer="kanton_28-filt_reworked-a2cfbe"
        paint={{
          "fill-outline-color": "rgba(256,256,256,1)",
          "fill-color": "#2D73C5",
          "fill-opacity": 0.6,
        }}
        beforeId="poi-label"
        layout={{ visibility: "visible" }}
      />

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
          beforeId="poi-label"
        />
      )}
    </Source>
  );
};

export default CountiesLayer;
