import style from './PlotCard.module.scss'
import { BsPeople as PopulationIcon } from 'react-icons/bs'
import { RiSignpostLine as PostIcon } from 'react-icons/ri'
import { RiRuler2Line as RulerIcon } from 'react-icons/ri'
import { useEventStore } from '../../../store'

const PlotCard = ({ item }) => {
  const { setHoveredFeature, setClickedFeature } = useEventStore()

  const plotData = {
    id: item?.properties?.IDEDDP.replace(':', '/'),
    county: item?.properties?.COMMUNE,
    surface: item?.properties?.SURFACE,
    typology: item?.properties?.TYPOLOGIE,
    egrid: item?.properties?.EGRID,
    address: item?.properties?.ADDRESS,
  }

  return (
    <li
      className={style.plotCard}
      onMouseEnter={() => setHoveredFeature(item)}
      onMouseLeave={() => setHoveredFeature(null)}
      onClick={() => setClickedFeature(item)}
    >
      <p className={style.id}> {plotData.id}</p>

      <span className={style.county}>{plotData.county}</span>

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

export default PlotCard
