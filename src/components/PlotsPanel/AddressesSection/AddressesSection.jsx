import style from "./AddressesSection.module.scss";

const AddressesSection = ({ addresses }) => {
  const availableAddresses = addresses?.filter((item) => item.adresse);

  if (!availableAddresses?.length) return null;
  return (
    <>
      <ul className={style.section}>
        <h3 className={style.title}>Address(es):</h3>

        {availableAddresses.map((item) => (
          <li className={style.addressItem} key={item.adresse}>
            <p>
              {item.adresse},&nbsp;{item?.no_postal}
            </p>
            &nbsp;
            <p>{item?.commune}</p>
          </li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </>
  );
};

export default AddressesSection;
