import { useMap } from 'react-map-gl'
import style from './FeaturesPanel.module.scss'
import bbox from '@turf/bbox'
import { useEventStore } from '../../store'
import FeatureItem from './FeatureItem/FeatureItem'
import { useState } from 'react'
import { Panel } from '../../components'

import { LuMapPinOff as PinIcon } from 'react-icons/lu'

const FeaturesPanel = ({
  icon,
  title,
  buttonIcon,
  buttonText,
  emptyTitle,
  emptyText,
  features,
}) => {
  const [open, setOpen] = useState(false)
  const { current: map } = useMap()
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

  return (
    <Panel
      open={open}
      setOpen={setOpen}
      className={style.featuresPanel}
      panelPosition={{ x: 10, y: 10 }}
      panelSide='left'
      heading={
        <div className={style.heading}>
          {icon}

          <h2>{title}</h2>
        </div>
      }
      buttonText={title}
      buttonIcon={buttonIcon}
      buttonPosition={{ top: 10, left: 10 }}
    >
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
      ) : (
        <div className={style.noResults}>
          <PinIcon size={24} />
          <h3>{emptyTitle}</h3>
          <p>{emptyText}</p>
        </div>
      )}
    </Panel>
  )
}

export default FeaturesPanel
