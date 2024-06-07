import { Layer, Source } from "react-map-gl";

const PlotsLayer = ({ county, hoverPlot }) => {
  const countyName = county?.properties?.gdname;
  let communeFilter = ["match", ["get", "COMMUNE"], countyName, true, false];

  if (countyName?.[0] === "[") {
    communeFilter = [
      "match",
      ["get", "COMMUNE"],
      JSON.parse(countyName),
      true,
      false,
    ];
  }

  const plotsFilter = [
    "all",
    ["match", ["get", "TYPE_PROPR"], ["privé"], true, false],
    ["match", ["geometry-type"], ["Polygon"], true, false],
    communeFilter,
  ];

  const hoverPlotId = hoverPlot?.properties?.EGRID;
  const filterForHoverPlot = ["in", "EGRID", hoverPlotId];

  if (!county) return null;
  return (
    <Source id="lotsSource" type="vector" url="mapbox://lamapch.64ix47h1">
      <Layer
        id="plots"
        type="fill"
        source-layer="CAD_PARCELLE_MENSU_WGS84-dor0ac"
        filter={plotsFilter}
        paint={{ "fill-color": "#2d73c5", "fill-opacity": 0.6 }}
        beforeId="poi-label"
      />

      {hoverPlot && (
        <Layer
          id="plotsHover"
          type="fill"
          source-layer="CAD_PARCELLE_MENSU_WGS84-dor0ac"
          filter={filterForHoverPlot}
          paint={{
            "fill-color": "#ed0e2c",
            "fill-opacity": 0.6,
          }}
          beforeId="poi-label"
        />
      )}
    </Source>
  );
};

export default PlotsLayer;
