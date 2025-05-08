import { List } from '../../../components'
import CertCard from './CertCard/CertCard'
import style from './CertsSection.module.scss'

const CertsSection = ({ certs }) => {
  if (!certs?.length) return null

  return (
    <List title='Certificates:' className={style.certs}>
      {certs?.map(cert => (
        <CertCard key={cert?.numero} cert={cert} />
      ))}
    </List>
  )
}

export default CertsSection
