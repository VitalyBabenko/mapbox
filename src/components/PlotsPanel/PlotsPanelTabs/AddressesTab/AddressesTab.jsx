import BuildingsList from "./BuildingsList/BuildingsList";
import CertificatesList from "./CertificatesList/CertificatesList";
import style from "./AddressesTab.module.scss";

const AddressesTab = ({ plotInfo }) => {
  const availableAddresses = plotInfo?.addresses?.filter(
    (item) => item.adresse
  );
  const buildings = [];

  plotInfo?.addresses?.forEach((address) => {
    if (address?.housing_stats_data) {
      buildings.push(address?.housing_stats_data);
    }
  });

  if (!availableAddresses?.length) return null;
  return (
    <ul className={style.tab}>
      {availableAddresses.map((item) => (
        <li key={item.adresse} className={style.addressItem}>
          <h3>{item.adresse}</h3>
          <div className={style.commune}>
            {item?.commune}, {item?.no_postal}
          </div>
          <p className={style.city}>Genève</p>

          <CertificatesList
            address={item}
            isPpe={!!plotInfo?.ppe}
            isConstructionCerts={false}
          />

          <BuildingsList buildings={item?.housing_stats_data} />
        </li>
      ))}
    </ul>
  );
};

export default AddressesTab;
