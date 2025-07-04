import { List } from '../../../components'
import CertCard from './CertCard/CertCard'
import style from './CertsSection.module.scss'
import { useLocale } from '../../../hooks/useLocale'

const CertsSection = ({ info }) => {
  const { t } = useLocale('panels.plots')
  const certs = Array.from(new Set(info?.construction_certs))

  if (!certs?.length) return null
  return (
    <List title={t('buildingPermits')} className={style.certs}>
      {certs?.map(cert => (
        <CertCard key={cert?.numero} cert={cert} />
      ))}
    </List>
  )
}

export default CertsSection
