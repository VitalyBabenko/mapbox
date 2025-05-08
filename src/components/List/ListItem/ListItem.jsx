import style from './ListItem.module.scss'

const ListItem = ({ children, className, onClick }) => {
  return (
    <li className={`${style.listItem} ${className}`} onClick={onClick}>
      {children}
    </li>
  )
}

export default ListItem
