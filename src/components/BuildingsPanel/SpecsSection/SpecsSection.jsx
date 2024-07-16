import style from './SpecsSection.module.scss'
import {
  BiTimeFive as ClockIcon,
  BiDoorOpen as DoorIcon,
  BiArea as AreaIcon,
} from 'react-icons/bi'
import { RiSignpostLine as MailIcon } from 'react-icons/ri'

const SpecsSection = ({
  constructionYear,
  apartmentsQuantity,
  buildingArea,
  postCode,
}) => {
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
          <span>Apartments qty</span>
          <p>{apartmentsQuantity}</p>
        </li>
      )}

      {buildingArea && (
        <li>
          <AreaIcon size={40} />
          <span>Building surface</span>
          <p>{buildingArea}m²</p>
        </li>
      )}

      {postCode && (
        <li>
          <MailIcon size={40} />
          <span>Post code</span>
          <p>{postCode}</p>
        </li>
      )}
    </ul>
  )
}

export default SpecsSection
