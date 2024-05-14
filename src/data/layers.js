export const countiesFillLayer = {
  id: "countiesFill",
  type: "fill",
  paint: {
    "fill-outline-color": "rgba(256,256,256,1)",
    "fill-color": "#2D73C5",
    "fill-opacity": 0.6,
  },
};

// Highlighted county polygons
export const highlightCountiesFillLayer = {
  id: "countiesHighlighted",
  type: "fill",
  source: "counties",
  paint: {
    "fill-color": "#ed0e2c",
    "fill-opacity": 0.6,
  },
};
