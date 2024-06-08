import BuildingsList from "./BuildingsList/BuildingsList";
import CertificatesList from "./CertificatesList/CertificatesList";
import { BiLinkExternal as LinkIcon } from "react-icons/bi";
import style from "./AddressesSection.module.scss";

const AddressesSection = ({ plotInfo }) => {
  const availableAddresses = plotInfo?.addresses?.filter(
    (item) => item.adresse
  );

  const isDividerNeeded = !!plotInfo?.ownership_info?.length;

  if (!availableAddresses?.length) return null;
  return (
    <section className={style.section}>
      <h3>Address(es)</h3>

      <ul className={style.list}>
        {availableAddresses.map((item) => (
          <li key={item.adresse} className={style.addressItem}>
            <div className={style.heading}>
              <h3>{item.adresse}</h3>

              {item?.lien_registre_batiments && (
                <>
                  <a
                    target="_blank"
                    href={item?.lien_registre_batiments}
                    rel="noreferrer"
                  >
                    <LinkIcon />
                    <p className={style.tooltip}>Registre des Bâtiments</p>
                  </a>
                </>
              )}
            </div>

            <div className={style.commune}>
              {item?.commune}, {item?.no_postal}
            </div>
            <p className={style.city}>Genève</p>

            <CertificatesList address={item} isConstructionCerts={true} />

            <BuildingsList buildings={item?.housing_stats_data} />
          </li>
        ))}
      </ul>

      {isDividerNeeded && <div className={style.divider}></div>}
    </section>
  );
};

export default AddressesSection;
