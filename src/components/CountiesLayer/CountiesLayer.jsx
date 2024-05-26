import { Layer, Source, useMap } from "react-map-gl";
import { data } from "../../data/genevaBoundaries";
import { useEffect } from "react";
import bbox from "@turf/bbox";

const CountiesLayer = ({ hoverCounty, county }) => {
  const { current: map } = useMap();
  const hoverCountyName = hoverCounty?.properties?.gdname || "";
  const filterForHighlightCounty = ["in", "gdname", hoverCountyName];

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
    <Source id="counties" type="geojson" data={data}>
      <Layer
        id="countiesFill"
        type="fill"
        paint={{
          "fill-outline-color": "rgba(256,256,256,1)",
          "fill-color": "#2D73C5",
          "fill-opacity": 0.6,
        }}
        beforeId="poi-label"
      />

      <Layer
        id="countiesHighlighted"
        type="fill"
        source="counties"
        paint={{
          "fill-color": "#ed0e2c",
          "fill-opacity": 0.6,
        }}
        filter={filterForHighlightCounty}
        beforeId="poi-label"
      />
    </Source>
  );
};

export default CountiesLayer;
