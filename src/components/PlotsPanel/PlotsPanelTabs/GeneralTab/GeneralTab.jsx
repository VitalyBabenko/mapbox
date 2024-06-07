import style from "./GeneralTab.module.scss";

const GeneralTab = ({ plotInfo }) => {
  return (
    <div className={style.root}>
      <h3>Zone</h3>

      <ul className={style.zone}>
        {plotInfo?.zone?.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      <div className={style.divider}></div>
    </div>
  );
};

export default GeneralTab;
