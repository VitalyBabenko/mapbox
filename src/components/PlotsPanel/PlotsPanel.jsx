import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiTimeFive as ClockIcon,
} from "react-icons/bi";
import style from "./PlotsPanel.module.scss";
import { useEffect, useState } from "react";
import { service } from "../../service";
import Loader from "../Loader/Loader";

const PlotsPanel = ({ plot, setPlot }) => {
  const [plotInfo, setPlotInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const closePlotPanel = () => setPlot(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const info = await service.getPlotByEgrId(plot?.properties?.EGRID);
      console.log(info);
      setPlotInfo(info);
      setIsLoading(false);
    };

    if (plot) getData();
  }, [plot]);

  if (!plot) return null;
  if (isLoading)
    return (
      <div className={style.panelLoading}>
        <Loader />
      </div>
    );
  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <h2>Plot {plot.id}</h2>
        <StarIcon className={style.star} />
        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>

      <ul className={style.specs}>
        {plotInfo?.surface_parcelle_m2 && (
          <li>
            <AreaIcon size={40} />
            <p>{plotInfo?.surface_parcelle_m2} m²</p>
            <span>Area</span>
          </li>
        )}

        {plotInfo?.addresses.length && (
          <li>
            <ClockIcon size={40} />
            <p>not found</p>
            <span>Construction year</span>
          </li>
        )}

        {plotInfo?.addresses.length && (
          <li>
            <BuildingIcon size={40} />
            <p>{plotInfo?.addresses.length}</p>
            <span>Building(s)</span>
          </li>
        )}
      </ul>

      <div className={style.divider}></div>

      <label>
        <h3>My notes</h3>
        <input />
      </label>

      <div className={style.divider}></div>

      {plotInfo?.addresses && (
        <ul className={style.addresses}>
          <h3>Address(es)</h3>
          {plotInfo.addresses.map(({ adresse }) => (
            <li>{adresse}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlotsPanel;
