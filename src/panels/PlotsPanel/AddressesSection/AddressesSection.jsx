import BuildingsList from './BuildingsList/BuildingsList'
import CertificatesList from './CertificatesList/CertificatesList'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import Tooltip from '../../../components/Tooltip/Tooltip'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'

const AddressesSection = ({ plotInfo }) => {
  const availableAddresses = plotInfo?.addresses?.filter(item => item.adresse)

  const HeadingLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} rel='noreferrer'>
        <Tooltip text='Registre des Bâtiments' top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  if (!availableAddresses?.length) return null
  return (
    <List title='Address(es):'>
      {availableAddresses.map(item => (
        <ListItem>
          <hgroup>
            <h3>{item.adresse}</h3>
            <HeadingLink link={item?.lien_registre_batiments} />
          </hgroup>

          <h4>
            {item?.commune}, {!!+item?.no_postal && item?.no_postal}
            <br />
            {item?.nom_npa && 'Genève'}
          </h4>

          <CertificatesList
            isMinergie={!!item?.certificat_minergie_details?.length}
            isConstructionCerts={!!plotInfo?.construction_certs?.length}
            isPpe={!!plotInfo?.ppe}
          />

          <BuildingsList buildings={item?.housing_stats_data} />
        </ListItem>
      ))}
    </List>
  )
}

export default AddressesSection
