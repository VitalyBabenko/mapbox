import style from './Switch.module.scss'

const Switch = ({ className, checked, onChange, label, ...props }) => {
  const rootClassName = `${style.root} ${className}`

  return (
    <label className={rootClassName}>
      <input
        className={style.input}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        hidden
        {...props}
      />

      <span className={style.slider}></span>

      {label && <p>{label}</p>}
    </label>
  )
}

export default Switch
