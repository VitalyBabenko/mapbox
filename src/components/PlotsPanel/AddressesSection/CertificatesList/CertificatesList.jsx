import { SlEnergy as EnergyIcon } from "react-icons/sl";
import { LuConstruction as ConstructionIcon } from "react-icons/lu";
import style from "./CertificatesList.module.scss";

const CertificatesList = ({ address, isConstructionCerts }) => {
  const isMinergie = !!address?.certificat_minergie_details?.length;

  return (
    <ul className={style.list}>
      <li>
        {isMinergie && <EnergyIcon size={28} />}
        <p className={style.tooltip}>Minergie certificate available</p>
      </li>

      <li>
        {isConstructionCerts && (
          <ConstructionIcon size={28} strokeWidth={1.6} />
        )}
        <p className={style.tooltipConstruction}>
          Building construction certificates delivered
        </p>
      </li>
    </ul>
  );
};

export default CertificatesList;
