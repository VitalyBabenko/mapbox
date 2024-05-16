import style from "./MapDataPanel.module.scss";
import { ReactComponent as MapDataIcon } from "../../icons/mapData.svg";
import { ReactComponent as CrossIcon } from "../../icons/cross.svg";

const MapDataPanel = () => {
  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <MapDataIcon />
        <h2>Maps & Data</h2>
        <CrossIcon />
      </div>
    </div>
  );
};

export default MapDataPanel;
