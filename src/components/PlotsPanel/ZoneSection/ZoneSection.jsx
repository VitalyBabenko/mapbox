import style from "./ZoneSection.module.scss";

const ZoneSection = ({ plotInfo }) => {
  return (
    <div className={style.root}>
      <h3>Zone</h3>

      <ul className={style.zone}>
        {plotInfo?.zone?.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </div>
  );
};

export default ZoneSection;
