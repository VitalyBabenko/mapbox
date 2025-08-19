// import { BiMap as MapIcon } from 'react-icons/bi'
import style from './EmptyState.module.scss'
import { LiaSearchLocationSolid as LocationIcon } from 'react-icons/lia'

const EmptyState = ({
  icon: Icon = LocationIcon,
  message = 'No objects found on the map',
  iconSize = 48,
  className = '',
}) => {
  return (
    <div className={`${style.emptyState} ${className}`}>
      <Icon className={style.emptyIcon} size={iconSize} />
      <p className={style.emptyMessage}>{message}</p>
    </div>
  )
}

export default EmptyState
