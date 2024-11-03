import style from './SpecsSection.module.scss'
import {
  BiTimeFive as ClockIcon,
  BiDoorOpen as DoorIcon,
  BiArea as AreaIcon,
} from 'react-icons/bi'

const SpecsSection = ({
  constructionYear,
  apartmentsQuantity,
  buildingArea,
  locale,
}) => {
  const titles = {
    constructionYear: {
      en: 'Building Construction Year:',
      fr: 'Annee de Construction du Batiment:',
      de: 'Baujahr des Gebäudes:',
    },
  }

  return (
    <ul className={style.section}>
      {constructionYear && (
        <li>
          <ClockIcon size={40} />
          <span>{titles.constructionYear[locale]}</span>
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
    </ul>
  )
}

export default SpecsSection
