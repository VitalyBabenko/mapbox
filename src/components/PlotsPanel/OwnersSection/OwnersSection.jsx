import { calculateAge } from "../../../utils/calculateAge";
import { convertTimeFormat } from "../../../utils/convertTimeFormat";
import style from "./OwnersSection.module.scss";

const OwnersSection = ({ ownershipInfo }) => {
  const owners = ownershipInfo?.map((info) => info.owner);

  if (!owners?.length) return null;
  return (
    <>
      <h3>Owner(s): </h3>

      <ul className={style.ownersList}>
        {ownershipInfo?.map(({ owner, last_transaction }) => (
          <li key={owner?.name} className={style.ownerItem}>
            {owner?.name && <p className={style.name}> {owner.name}</p>}

            {owner?.date_de_naissance && (
              <span>
                Date of birth: {convertTimeFormat(owner?.date_de_naissance)}
                &nbsp;(
                {calculateAge(owner?.date_de_naissance)} years old)
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </>
  );
};

export default OwnersSection;
