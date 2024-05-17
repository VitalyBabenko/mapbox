import lightMapPreview from "../assets/images/lightMapPreview.png";
import darkMapPreview from "../assets/images/darkMapPreview.png";
import satelliteMapPreview from "../assets/images/satelliteMapPreview.png";

export const initialView = {
  longitude: 6.143724445834019,
  latitude: 46.203988837044086,
  zoom: 10.5,
};

export const mapStyles = {
  default: "mapbox://styles/mapbox/light-v10",
  dark: "mapbox://styles/mapbox/dark-v10",
  satellite: "mapbox://styles/mapbox/satellite-streets-v12",
};

const styleOptions = [
  {
    id: "default",
    title: "Default",
    image: lightMapPreview,
  },
  {
    id: "dark",
    title: "Dark",
    image: darkMapPreview,
  },
  {
    id: "satellite",
    title: "Satellite",
    image: satelliteMapPreview,
  },
];
