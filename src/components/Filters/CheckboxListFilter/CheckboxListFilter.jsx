import Checkbox from "../../Checkbox/Checkbox";
import style from "./CheckboxListFilter.module.scss";

const CheckboxListFilter = ({ checkboxes }) => {
  return (
    <div className={style.type}>
      {checkboxes.map((filter) => (
        <Checkbox key={filter.id} label={filter.title} />
      ))}
    </div>
  );
};

export default CheckboxListFilter;
