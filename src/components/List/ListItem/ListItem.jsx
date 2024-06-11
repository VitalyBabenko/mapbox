import style from "./ListItem.module.scss";

const ListItem = ({ children }) => {
  return <li className={style.listItem}>{children}</li>;
};

export default ListItem;
