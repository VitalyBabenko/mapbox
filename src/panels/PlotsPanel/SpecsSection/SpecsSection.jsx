import {
  BiArea as AreaIcon,
  BiBuildings as BuildingIcon,
  BiHome as HomeIcon,
  BiUser as OwnerIcon,
} from 'react-icons/bi'
import style from './SpecsSection.module.scss'

const SpecsSection = ({ plotInfo }) => {
  const plotSurface = plotInfo?.surface_parcelle_m2 || null
  const livingSurface = plotInfo?.getLivingSurface() || null
  const ownersQuantity = plotInfo?.ownership_info?.length || null
  const buildingsQuantity = plotInfo?.addresses?.length || null

  return (
    <ul className={style.section}>
      {plotSurface && (
        <li>
          <AreaIcon size={40} />
          <span>Plot surface</span>
          <p>{plotInfo.surface_parcelle_m2} m²</p>
        </li>
      )}

      {livingSurface && (
        <li>
          <HomeIcon size={40} />
          <span>Living surface</span>
          <p>{livingSurface} m²</p>
        </li>
      )}

      {ownersQuantity && (
        <li>
          <OwnerIcon size={40} />
          <span>Owner(s)</span>
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
