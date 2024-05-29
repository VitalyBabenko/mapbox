import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiTimeFive as ClockIcon,
  BiStar as StarIcon,
} from "react-icons/bi";
import { AiOutlineClose as CrossIcon } from "react-icons/ai";
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

  const createNote = (e) => {
    e.preventDefault();
  };

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
        <h2>Plot {plotInfo?.no_commune_no_parcelle}</h2>
        <StarIcon className={style.star} />
        <CrossIcon onClick={closePlotPanel} className={style.crossIcon} />
      </div>

      <p className={style.commune}>
        Commune: <span>{plotInfo.commune_name}</span>
      </p>

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

      <form onSubmit={createNote} className={style.notes}>
        <label>
          <h3>My notes</h3>
          <input />
        </label>
        <button>Send</button>
      </form>

      <div className={style.divider}></div>

      {plotInfo?.addresses.length && (
        <ul className={style.addresses}>
          <h3>Address(es):</h3>
          {plotInfo.addresses.map(({ adresse }) => (
            <li key={adresse}>{adresse}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlotsPanel;
