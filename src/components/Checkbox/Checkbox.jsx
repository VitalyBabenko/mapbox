import style from "./Checkbox.module.scss";
import { BiCheck as CheckIcon } from "react-icons/bi";

const Checkbox = ({ className, checked, onChange, label, ...props }) => {
  const rootClassName = `${style.root} ${className}`;

  return (
    <label className={rootClassName}>
      <input
        className={style.input}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        hidden
        {...props}
      />

      <span>
        <CheckIcon />
      </span>

      <p>{label}</p>
    </label>
  );
};

export default Checkbox;
