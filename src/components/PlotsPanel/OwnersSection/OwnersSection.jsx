import { calculateAge } from "../../../utils/calculateAge";
import { convertTimeFormat } from "../../../utils/convertTimeFormat";
import style from "./OwnersSection.module.scss";

const OwnersSection = ({ plotInfo }) => {
  const owners = plotInfo?.getOwners() || null;

  const isDividerNeeded = !!plotInfo?.ownership_info
    ?.map((info) => info?.last_transaction)
    ?.filter((transaction) => !!transaction?._id);

  if (!owners?.length) return null;
  return (
    <section className={style.section}>
      <h3>Owners</h3>

      <ul>
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

      {isDividerNeeded && <div className={style.divider}></div>}
    </section>
  );
};

export default OwnersSection;
