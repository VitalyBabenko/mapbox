import { SlEnergy as EnergyIcon } from 'react-icons/sl'
import { BiCertification as ConstructionIcon } from 'react-icons/bi'
import style from './CertificatesList.module.scss'
import Tooltip from '../../../Tooltip/Tooltip'

// Chemin Du Nant-D'argent 35, 1223

const CertificatesList = ({ isMinergie, isConstructionCerts, isPpe }) => {
  if (!isMinergie && !isPpe && !isConstructionCerts) return null
  return (
    <div className={style.list}>
      {isMinergie && (
        <Tooltip text='Minergie certificate available' top='-40px' left='-10px'>
          <EnergyIcon size={26} />
        </Tooltip>
      )}

      {isPpe && (
        <Tooltip text='Specific type of building' top='-40px' left='-10px'>
          <b className={style.ppe}>PPE</b>
        </Tooltip>
      )}

      {isConstructionCerts && (
        <Tooltip
          text='Construction certificates delivered'
          top='-40px'
          left='-10px'
        >
          <ConstructionIcon size={26} />
        </Tooltip>
      )}
    </div>
  )
}

export default CertificatesList
