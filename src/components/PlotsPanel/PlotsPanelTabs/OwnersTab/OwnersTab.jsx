import { calculateAge } from "../../../../utils/calculateAge";
import { convertTimeFormat } from "../../../../utils/convertTimeFormat";
import style from "./OwnersTab.module.scss";

const OwnersTab = ({ plotInfo }) => {
  const owners = plotInfo?.ownership_info?.map((info) => info.owner);

  if (!owners?.length) return null;
  return (
    <ul className={style.ownersList}>
      {owners.map((owner) => (
        <li key={owner?.name} className={style.ownerItem}>
          {owner?.name && <p className={style.name}> {owner.name}</p>}

          {owner?.date_de_naissance && (
            <p className={style.age}>
              Date of birth:{" "}
              <span>{convertTimeFormat(owner?.date_de_naissance)}</span>
              &nbsp;(
              {calculateAge(owner?.date_de_naissance)} years old)
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default OwnersTab;
