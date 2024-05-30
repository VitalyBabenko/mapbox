import { calculateAge } from "../../../utils/calculateAge";
import { convertTimeFormat } from "../../../utils/convertTimeFormat";
import style from "./OwnersSection.module.scss";

const OwnersSection = ({ ownershipInfo }) => {
  const owners = ownershipInfo?.map((info) => info.owner);
  console.log(owners[0].date_de_naissance);

  if (!owners?.length) return null;
  return (
    <>
      <h3>Owner(s): </h3>

      <ul className={style.ownersList}>
        {owners?.map((owner) => (
          <li className={style.ownerItem}>
            {owner?.name && <p className={style.name}> {owner.name}</p>}

            {owner?.date_de_naissance && (
              <span>
                Born: {convertTimeFormat(owner?.date_de_naissance)}&nbsp; (
                {calculateAge(owner?.date_de_naissance)} years old)
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default OwnersSection;
