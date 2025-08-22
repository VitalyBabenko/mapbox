import { useState } from 'react'
import style from './CountyStatsPanel.module.scss'
import { IoHome as HouseIcon } from 'react-icons/io5'
import { IoBusiness as BuildingIcon } from 'react-icons/io5'
import { useModeStore } from '@/store'

const CountyStatsPanel = ({ open, county }) => {
  const [selectedPropertyType, setSelectedPropertyType] = useState('house')

  const propertyTypes = [
    { id: 'house', icon: HouseIcon, label: 'Houses' },
    { id: 'apartments', icon: BuildingIcon, label: 'Apartments' },
  ]

  if (!open) return null

  return (
    <div className={style.countyStatsPanel}>
      <div className={style.header}>
        <h1>Commune Statistics</h1>
      </div>

      <div className={style.content}>
        <div className={style.location}>
          <h2>{county.properties.COMMUNE}</h2>
        </div>

        {/* Property Type Selection */}
        <div className={style.propertyTypes}>
          {propertyTypes.map(type => (
            <button
              key={type.id}
              className={`${style.propertyTypeButton} ${
                selectedPropertyType === type.id ? style.active : ''
              }`}
              onClick={() => setSelectedPropertyType(type.id)}
            >
              <type.icon className={style.propertyTypeIcon} />
              <span className={style.propertyTypeLabel}>{type.label}</span>
            </button>
          ))}
        </div>

        {/* Main Statistic */}
        <div className={style.mainStat}>
          <div className={style.mainNumber}>1 250</div>
          <div className={style.mainLabel}>Number Of Sales Over 12 Months</div>
        </div>

        {/* Footer Link */}
        <div className={style.footer}>
          <a href='#' className={style.footerLink}>
            Find Out More About This Commune Here
          </a>
        </div>
      </div>
    </div>
  )
}

export default CountyStatsPanel
