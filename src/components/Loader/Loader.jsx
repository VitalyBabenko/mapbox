import style from "./Loader.module.scss";

const Loader = () => {
  return (
    <svg className={style.spinner} viewBox="0 0 50 50">
      <circle
        className={style.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};

export default Loader;
