import style from "./BuildingPanel.module.scss";
import { ReactComponent as StarIcon } from "../../assets/svg/star.svg";
import { ReactComponent as CrossIcon } from "../../assets/svg/cross.svg";
import { useEffect, useState } from "react";
import { buildingsService } from "../../service/buildingsService";
import Loader from "../Loader/Loader";

const BuildingPanel = ({ building, setBuilding }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [buildingInfo, setBuildingInfo] = useState(null);
  const closeBuildingPanel = () => setBuilding(null);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      const info = await buildingsService.getByEgrid(
        building?.properties?.egrid
      );

      setBuildingInfo(info);
      setIsLoading(false);
    };

    if (building) getData();
  }, [building]);

  if (!building) return null;
  if (isLoading) {
    return (
      <div className={style.panelLoading}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={style.panel}>
      <div className={style.heading}>
        <h2>ERGID {building.properties.egrid}</h2>
        <StarIcon className={style.star} />
        <CrossIcon onClick={closeBuildingPanel} className={style.crossIcon} />
      </div>
    </div>
  );
};

export default BuildingPanel;
