import style from "./List.module.scss";

const List = ({ title, className = style.list, children }) => {
  return (
    <>
      <h2 className={style.listTitle}>{title}</h2>
      <ul className={className}>{children}</ul>
    </>
  );
};

export default List;
