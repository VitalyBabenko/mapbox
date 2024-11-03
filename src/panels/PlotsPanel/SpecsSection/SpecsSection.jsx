import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiUser as OwnerIcon,
} from 'react-icons/bi'
import style from './SpecsSection.module.scss'

const SpecsSection = ({ plotInfo, locale }) => {
  const plotSurface = plotInfo?.surface_parcelle_m2 || null
  const ownersQuantity = plotInfo?.owners?.length || null
  const buildingsQuantity = plotInfo?.addresses?.length || null

  const titles = {
    owners: {
      en: 'Owner(s)',
      fr: 'Propriétaire(s)',
      de: 'Eigentümer',
    },
  }

  return (
    <ul className={style.section}>
      {plotSurface && (
        <li>
          <AreaIcon size={40} />
          <span>Plot surface</span>
          <p>{plotInfo.surface_parcelle_m2} m²</p>
        </li>
      )}

      {ownersQuantity && (
        <li>
          <OwnerIcon size={40} />
          <span>{titles.owners[locale]}</span>
          <p>{ownersQuantity}</p>
        </li>
      )}

      {buildingsQuantity && (
        <li>
          <BuildingIcon size={40} />
          <span>Building(s)</span>
          <p>{plotInfo?.addresses.length}</p>
        </li>
      )}
    </ul>
  )
}

export default SpecsSection
