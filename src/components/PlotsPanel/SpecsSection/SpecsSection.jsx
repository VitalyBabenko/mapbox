import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
} from "react-icons/bi";
import { LuConstruction as ConstructionIcon } from "react-icons/lu";
import { IoPersonOutline as OwnerIcon } from "react-icons/io5";
import style from "./SpecsSection.module.scss";

const SpecsSection = ({ plotInfo }) => {
  return (
    <ul className={style.section}>
      {plotInfo?.surface_parcelle_m2 && (
        <li>
          <AreaIcon size={40} />
          <span>Plot surface:</span>
          <p>{plotInfo.surface_parcelle_m2} m²</p>
        </li>
      )}

      {plotInfo?.ownership_info?.length && (
        <li>
          <OwnerIcon size={40} />
          <span>Owner(s):</span>
          <p>{plotInfo?.ownership_info?.length}</p>
        </li>
      )}

      {plotInfo?.addresses.length && (
        <li>
          <BuildingIcon size={40} />
          <span>Building(s)</span>
          <p>{plotInfo?.addresses.length}</p>
        </li>
      )}
    </ul>
  );
};

export default SpecsSection;
