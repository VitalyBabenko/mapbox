import BuildingsList from "../BuildingsList/BuildingsList";
import CertificatesList from "../CertificatesList/CertificatesList";
import style from "./AddressesSection.module.scss";

const AddressesSection = ({ addresses, isPpe, isConstructionCerts }) => {
  const availableAddresses = addresses?.filter((item) => item.adresse);
  const buildings = [];

  addresses?.forEach((address) => {
    if (address?.housing_stats_data) {
      buildings.push(address?.housing_stats_data);
    }
  });

  if (!availableAddresses?.length) return null;
  return (
    <>
      <h3 className={style.title}>Address(es):</h3>

      <ul className={style.section}>
        {availableAddresses.map((item) => (
          <li key={item.adresse} className={style.addressItem}>
            <h3>{item.adresse}</h3>
            <div className={style.commune}>
              {item?.commune}, {item?.no_postal}
            </div>
            <p className={style.city}>Genève</p>

            <CertificatesList
              address={item}
              isPpe={isPpe}
              isConstructionCerts={isConstructionCerts}
            />

            <BuildingsList buildings={item?.housing_stats_data} />
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </>
  );
};

export default AddressesSection;
