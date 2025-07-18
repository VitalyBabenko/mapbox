import { useLocale } from '../../../hooks/useLocale'
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
}) => {
  const { t } = useLocale('panels.buildings')

  return (
    <ul className={style.section}>
      {constructionYear && (
        <li>
          <ClockIcon size={40} />
          <span>{t('constructionYear')}</span>
          <p>{constructionYear}</p>
        </li>
      )}

      {apartmentsQuantity && (
        <li>
          <DoorIcon size={40} />
          <span>{t('apartmentsQuantity')}</span>
          <p>{apartmentsQuantity}</p>
        </li>
      )}

      {buildingArea && (
        <li>
          <AreaIcon size={40} />
          <span>{t('buildingArea')}</span>
          <p>{buildingArea}m²</p>
        </li>
      )}
    </ul>
  )
}

export default SpecsSection
