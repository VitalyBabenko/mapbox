import lightMapPreview from "../assets/images/lightMapPreview.png";
import darkMapPreview from "../assets/images/darkMapPreview.png";
import streetsMapPreview from "../assets/images/streetsMapPreview.png";
import satelliteMapPreview from "../assets/images/satelliteMapPreview.png";

export const INITIAL_VIEW = {
  LONGITUDE: 6.143724445834019,
  LATITUDE: 46.203988837044086,
  ZOOM: 10.5,
};

export const MAP_STYLES = [
  {
    TITLE: "Light",
    URL: "mapbox://styles/mapbox/light-v10",
    IMAGE: lightMapPreview,
  },
  {
    TITLE: "Dark",
    URL: "mapbox://styles/mapbox/dark-v10",
    IMAGE: darkMapPreview,
  },
  {
    TITLE: "Streets",
    URL: "mapbox://styles/mapbox/streets-v12",
    IMAGE: streetsMapPreview,
  },
  {
    TITLE: "Satellite",
    URL: "mapbox://styles/mapbox/satellite-streets-v12",
    IMAGE: satelliteMapPreview,
  },
];
