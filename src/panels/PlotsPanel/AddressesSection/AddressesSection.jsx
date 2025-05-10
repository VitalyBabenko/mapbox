import BuildingsList from './BuildingsList/BuildingsList'
import CertificatesList from './CertificatesList/CertificatesList'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import Tooltip from '../../../components/Tooltip/Tooltip'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'

const AddressesSection = ({ info, locale }) => {
  const availableAddresses = info?.addresses?.filter(item => item.adresse)

  function addressToUpperCase(address) {
    return address
      .split(' ')
      .map(word =>
        word
          .split('-')
          .map(
            part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase(), // Преобразуем каждую часть
          )
          .join('-'),
      )
      .join(' ')
  }

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
            <h3>{addressToUpperCase(item.adresse)}</h3>
            <HeadingLink link={item?.lien_registre_batiments} />
          </hgroup>

          <h4>
            {!!+item?.no_postal && item?.no_postal} {item?.commune}
            <br />
            {item?.nom_npa && 'Genève'}
          </h4>

          <CertificatesList
            isMinergie={!!item?.certificat_minergie_details?.length}
            isConstructionCerts={!!info?.construction_certs?.length}
            isPpe={!!info?.ppe}
          />

          <BuildingsList
            plotInfo={info}
            address={item}
            buildings={item.buildings}
            locale={locale}
          />
        </ListItem>
      ))}
    </List>
  )
}

export default AddressesSection
