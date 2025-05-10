import { List } from '../../../components'
import CertCard from './CertCard/CertCard'
import style from './CertsSection.module.scss'

const CertsSection = ({ info }) => {
  const certs = Array.from(new Set(info?.construction_certs))

  if (!certs?.length) return null
  return (
    <List title='Building permit(s):' className={style.certs}>
      {certs?.map(cert => (
        <CertCard key={cert?.numero} cert={cert} />
      ))}
    </List>
  )
}

export default CertsSection
