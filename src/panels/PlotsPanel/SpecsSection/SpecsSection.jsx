import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiUser as OwnerIcon,
} from 'react-icons/bi'
import style from './SpecsSection.module.scss'
import { useLocale } from '../../../hooks/useLocale'

const SpecsSection = ({ plotInfo }) => {
  const { t } = useLocale('panels.plots')
  const plotSurface = plotInfo?.surface_parcelle_m2 || null
  const ownersQuantity = plotInfo?.owners?.length || null
  const buildingsQuantity = plotInfo?.addresses?.length || null

  return (
    <ul className={style.section}>
      {plotSurface && (
        <li>
          <AreaIcon size={40} />
          <span>{t('plotSurface')}</span>
          <p>{plotInfo.surface_parcelle_m2} m²</p>
        </li>
      )}

      {ownersQuantity && (
        <li>
          <OwnerIcon size={40} />
          <span>{t('owners')}</span>
          <p>{ownersQuantity}</p>
        </li>
      )}

      {buildingsQuantity && (
        <li>
          <BuildingIcon size={40} />
          <span>{t('buildings')}</span>
          <p>{plotInfo?.addresses.length}</p>
        </li>
      )}
    </ul>
  )
}

export default SpecsSection
