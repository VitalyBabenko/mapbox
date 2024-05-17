import style from "./MapDataPanel.module.scss";
import { ReactComponent as MapDataIcon } from "../../assets/svg/mapData.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import lightMapPreview from "../../assets/images/lightMapPreview.png";
import darkMapPreview from "../../assets/images/darkMapPreview.png";
import satelliteMapPreview from "../../assets/images/satelliteMapPreview.png";
import { mapStyles } from "../../constants";

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

const MapDataPanel = ({ closePanel, mapRef }) => {
  const toggleMapStyle = (style) => {
    const map = mapRef.current.getMap();
    map.setStyle(mapStyles[style]);
  };

  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <MapDataIcon />
        <h2>Maps & Data</h2>
        <CrossIcon onClick={closePanel} className={style.crossIcon} />
      </div>

      <h3>Basemap</h3>

      <ul>
        {styleOptions.map((option) => (
          <li onClick={() => toggleMapStyle(option.id)}>
            <img src={option.image} alt={`${option.id} map style`} />
            <span>{option.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapDataPanel;
