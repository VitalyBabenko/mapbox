import { SlEnergy as EnergyIcon } from "react-icons/sl";
import { BiCertification as ConstructionIcon } from "react-icons/bi";
import style from "./CertificatesList.module.scss";
import Tooltip from "../../../Tooltip/Tooltip";

const CertificatesList = ({ address, isConstructionCerts, isPpe }) => {
  const isMinergie = !!address?.certificat_minergie_details?.length;

  if (!isMinergie && !isPpe && !isConstructionCerts) return null;
  return (
    <div className={style.list}>
      {isMinergie && (
        <Tooltip text="Minergie certificate available" top="-40px" left="-10px">
          <EnergyIcon size={26} />
        </Tooltip>
      )}

      {isPpe && (
        <Tooltip text="Specific type of building" top="-40px" left="-10px">
          <b className={style.ppe}>PPE</b>
        </Tooltip>
      )}

      {isConstructionCerts && (
        <Tooltip
          text="Construction certificates delivered"
          top="-40px"
          left="-10px"
        >
          <ConstructionIcon size={26} />
        </Tooltip>
      )}
    </div>
  );
};

export default CertificatesList;
