import style from "./ZoneSection.module.scss";

const ZoneSection = ({ zone }) => {
  if (!zone) return null;
  return (
    <div className={style.section}>
      <h3>Zone</h3>

      <ul>
        {zone?.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </div>
  );
};

export default ZoneSection;
