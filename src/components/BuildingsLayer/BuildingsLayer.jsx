import { Layer, Source } from "react-map-gl";

import { lancyBuildings } from "../../data/lancyBuildings.js";

const BuildingsLayer = ({ county, hoverBuilding }) => {
  const hoverBuildingId = hoverBuilding?.properties?.egrid;
  const filterForHoverBuilding = ["in", "egrid", hoverBuildingId];

  if (!county) return null;
  return (
    <Source id="buildings" type="geojson" data={lancyBuildings}>
      <Layer
        id="buildingsFill"
        type="fill"
        paint={{
          "fill-outline-color": "rgba(256,256,256,1)",
          "fill-color": "#2D73C5",
          "fill-opacity": 0.6,
        }}
        beforeId="poi-label"
      />
      <Layer
        id="hoverBuilding"
        type="fill"
        source="counties"
        paint={{
          "fill-color": "#ed0e2c",
          "fill-opacity": 0.6,
        }}
        filter={filterForHoverBuilding}
        beforeId="poi-label"
      />
    </Source>
  );
};

export default BuildingsLayer;
