import { useMap } from 'react-map-gl'
import style from './FeaturesPanel.module.scss'
import bbox from '@turf/bbox'
import { useEventStore } from '../../store'
import FeatureItem from './FeatureItem/FeatureItem'
import { useState } from 'react'
import { Tooltip } from '../../components'
import useDraggable from '../../hooks/useDraggable'
import { RiDraggable as DraggableIcon } from 'react-icons/ri'
import { AiOutlineClose as CrossIcon } from 'react-icons/ai'

const FeaturesPanel = ({ icon, title, buttonIcon, buttonText, features }) => {
  const [open, setOpen] = useState(false)
  const closePanel = () => setOpen(false)
  const { current: map } = useMap()
  const { position, handleMouseDown } = useDraggable({ x: 10, y: 10 })
  const { clickedFeature, setClickedFeature } = useEventStore()

  const handleItemClick = feature => {
    const [minLng, minLat, maxLng, maxLat] = bbox(feature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 2000, zoom: 17 },
    )
    setClickedFeature(feature)
  }

  if (!open)
    return (
      <button className={style.featuresButton} onClick={() => setOpen(true)}>
        {buttonIcon}

        {buttonText}
      </button>
    )

  return (
    <div className={style.panel} style={{ top: position.y, left: position.x }}>
      <div className={style.heading}>
        {icon}

        <h2>{title}</h2>

        <Tooltip text='Move the panel' bottom='-40px'>
          <DraggableIcon
            className={style.draggableIcon}
            onMouseDown={handleMouseDown}
          />
        </Tooltip>

        <CrossIcon onClick={closePanel} className={style.crossIcon} />
      </div>

      {features?.length ? (
        <div className={style.list}>
          {features?.map(feature => (
            <FeatureItem
              key={feature.properties?.EGRID}
              isActive={
                clickedFeature?.properties?.EGRID === feature.properties?.EGRID
              }
              feature={feature}
              handleItemClick={handleItemClick}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FeaturesPanel
