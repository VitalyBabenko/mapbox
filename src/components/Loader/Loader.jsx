import style from './Loader.module.scss'

const Loader = ({ withBackground }) => {
  const Spinner = () => {
    return (
      <svg className={style.spinner} viewBox='0 0 50 50'>
        <circle
          className={style.path}
          cx='25'
          cy='25'
          r='20'
          fill='none'
          strokeWidth='5'
        ></circle>
      </svg>
    )
  }

  if (withBackground) {
    return (
      <div className={style.background}>
        <Spinner />
      </div>
    )
  }

  return <Spinner />
}

export default Loader
