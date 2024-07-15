import style from './IconButton.module.scss'

const IconButton = (props) => {
  return <button className={style['icon-button']} {...props}></button>
}

export default IconButton
