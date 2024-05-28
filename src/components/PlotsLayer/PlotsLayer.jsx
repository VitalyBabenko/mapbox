import React, { useEffect, useState } from "react";
import { Layer, Source, useMap } from "react-map-gl";

const PlotsLayer = ({ county, hoverPlot }) => {
  const countyName =
    county?.properties?.gdname === "Geneve"
      ? [
          "Genève-Cité",
          "Genève-Eaux-Vives",
          "Genève-Plainpalais",
          "Genève-Petit-Saconnex",
        ]
      : [county?.properties?.gdname];

  const plotsFilter = [
    "all",
    ["match", ["get", "TYPE_PROPR"], ["privé"], true, false],
    ["match", ["geometry-type"], ["Polygon"], true, false],
    ["match", ["get", "COMMUNE"], countyName, true, false],
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
        beforeId="road-label-simple"
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
          beforeId="road-label-simple"
        />
      )}
    </Source>
  );
};

export default PlotsLayer;

// [
//   {
//
//     source: "composite",
//     id: "Plots",
//     paint: {
//       "fill-color": "#2d73c5",
//       "fill-opacity": 0.6,
//     },
//     "source-layer": "CAD_PARCELLE_MENSU_WGS84-dor0ac",
//   },
// ];
