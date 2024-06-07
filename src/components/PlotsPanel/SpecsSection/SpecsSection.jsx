import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiHome as HomeIcon,
  BiUser as OwnerIcon,
} from "react-icons/bi";
import style from "./SpecsSection.module.scss";

const SpecsSection = (props) => {
  const { surface, livingSurface, ownersQuantity, buildingsQuantity } = props;

  return (
    <>
      <ul className={style.section}>
        {surface && (
          <li>
            <AreaIcon size={40} />
            <span>Plot surface</span>
            <p>{surface} m²</p>
          </li>
        )}

        {livingSurface && (
          <li>
            <HomeIcon size={40} />
            <span>Living surface</span>
            <p>{livingSurface} m²</p>
          </li>
        )}

        {ownersQuantity && (
          <li>
            <OwnerIcon size={40} />
            <span>Owner(s)</span>
            <p>{ownersQuantity}</p>
          </li>
        )}

        {buildingsQuantity && (
          <li>
            <BuildingIcon size={40} />
            <span>Building(s)</span>
            <p>{buildingsQuantity}</p>
          </li>
        )}
      </ul>

      <div className={style.divider}></div>
    </>
  );
};

export default SpecsSection;
