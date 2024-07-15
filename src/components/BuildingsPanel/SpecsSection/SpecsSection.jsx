import style from './SpecsSection.module.scss'
import { BiTimeFive as ClockIcon } from 'react-icons/bi'
import { BiDoorOpen as DoorIcon } from 'react-icons/bi'

const SpecsSection = ({ constructionYear, apartmentsQuantity }) => {
  return (
    <ul className={style.section}>
      {constructionYear && (
        <li>
          <ClockIcon size={40} />
          <span>Construction Year</span>
          <p>{constructionYear}</p>
        </li>
      )}

      {apartmentsQuantity && (
        <li>
          <DoorIcon size={40} />
          <span>Apartments quantity</span>
          <p>{apartmentsQuantity}</p>
        </li>
      )}
    </ul>
  )
}

export default SpecsSection
