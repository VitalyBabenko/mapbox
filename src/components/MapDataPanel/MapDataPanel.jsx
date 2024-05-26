import style from "./MapDataPanel.module.scss";
import { ReactComponent as MapDataIcon } from "../../assets/svg/mapData.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { MAP_STYLES } from "../../constants";
import { useState } from "react";

const MapDataPanel = ({ mapRef }) => {
  const [activeStyle, setActiveStyle] = useState(MAP_STYLES[0].URL);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  const toggleMapStyle = (style) => {
    const map = mapRef.current.getMap();
    map.setStyle(style);
    setActiveStyle(style);
  };

  return (
    <>
      <button onClick={openPanel} className={style.openButton}>
        <MapDataIcon />
        Maps & Data
      </button>

      {isPanelOpen && (
        <div className={style.panel}>
          <div className={style.heading}>
            <MapDataIcon />
            <h2>Maps & Data</h2>
            <CrossIcon onClick={closePanel} className={style.crossIcon} />
          </div>

          <h3>Basemap</h3>

          <ul>
            {MAP_STYLES.map((STYLE) => (
              <li
                key={STYLE.URL}
                onClick={() => toggleMapStyle(STYLE.URL)}
                className={activeStyle === STYLE.URL ? style.active : null}
              >
                <img src={STYLE.IMAGE} alt={`${STYLE.TITLE} map style`} />
                <span>{STYLE.TITLE}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MapDataPanel;
