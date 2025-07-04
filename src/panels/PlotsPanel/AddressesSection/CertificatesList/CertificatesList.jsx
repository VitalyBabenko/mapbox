import { SlEnergy as EnergyIcon } from 'react-icons/sl'
import { BiCertification as ConstructionIcon } from 'react-icons/bi'
import style from './CertificatesList.module.scss'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import { useLocale } from '../../../../hooks/useLocale'

const CertificatesList = ({ isMinergie, isConstructionCerts, isPpe }) => {
  const { t } = useLocale('panels.plots')

  if (!isMinergie && !isPpe && !isConstructionCerts) return null
  return (
    <div className={style.list}>
      {isMinergie && (
        <Tooltip text={t('minergie')} top='-40px' left='-10px'>
          <EnergyIcon size={26} />
        </Tooltip>
      )}

      {isPpe && (
        <Tooltip text={t('specificType')} top='-40px' left='-10px'>
          <b className={style.ppe}>{t('ppe')}</b>
        </Tooltip>
      )}

      {isConstructionCerts && (
        <Tooltip text={t('constructionCerts')} top='-40px' left='-10px'>
          <ConstructionIcon size={26} />
        </Tooltip>
      )}
    </div>
  )
}

export default CertificatesList
