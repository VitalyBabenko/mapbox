import style from './CountyCard.module.scss'
import { BsPeople as PopulationIcon } from 'react-icons/bs'
import { RiSignpostLine as PostIcon } from 'react-icons/ri'
import { RiRuler2Line as RulerIcon } from 'react-icons/ri'
import { useEventStore } from '@store'

const CountyCard = ({ item }) => {
  const { setHoveredFeature, setClickedFeature } = useEventStore()

  return (
    <li
      className={style.countyCard}
      onMouseEnter={() => setHoveredFeature(item)}
      onMouseLeave={() => setHoveredFeature(null)}
      onClick={() => setClickedFeature(item)}
    >
      <h3>{item.properties?.COMMUNE}</h3>

      <ul className={style.info}>
        <li className={style.infoItem}>
          <span className={style.infoItemTitle}>Post code</span>
          <div className={style.infoItemValue}>
            <PostIcon size={14} />
            <p className={style.infoItemValueText}>
              {item.properties?.POST_CODE}
            </p>
          </div>
        </li>

        <li className={style.infoItem}>
          <span className={style.infoItemTitle}>Area</span>
          <div className={style.infoItemValue}>
            <RulerIcon size={14} />
            <p className={style.infoItemValueText}>
              {item.properties?.AREA_KM2} <span>km²</span>
            </p>
          </div>
        </li>

        <li className={style.infoItem}>
          <span className={style.infoItemTitle}>Population</span>
          <div className={style.infoItemValue}>
            <PopulationIcon size={14} />
            <p className={style.infoItemValueText}>
              {item.properties?.POPULATION?.toLocaleString()}{' '}
              <span>{item.properties?.POPULATION_YEAR}</span>
            </p>
          </div>
        </li>
      </ul>
    </li>
  )
}

export default CountyCard
