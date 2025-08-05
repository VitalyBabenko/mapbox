import BuildingsList from './BuildingsList/BuildingsList'
import CertificatesList from './CertificatesList/CertificatesList'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import Tooltip from '../../../components/Tooltip/Tooltip'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import { useLocale } from '../../../hooks/useLocale'
import style from './AddressesSection.module.scss'
import { SiGooglemaps as GoogleMapsIcon } from 'react-icons/si'
import { HiOutlineViewGrid as StigIcon } from 'react-icons/hi'

const AddressesSection = ({ info }) => {
  const { t } = useLocale('panels.plots')
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
        <Tooltip text={t('buildingRegistry')} top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  const isHasLinks = item => {
    return Boolean(item?.lien_google_maps_url || item?.lien_map_sitg_url)
  }

  if (!availableAddresses?.length) return null
  return (
    <List title={t('addresses')}>
      {availableAddresses.map((item, i) => (
        <ListItem key={i}>
          <hgroup>
            <h3>{addressToUpperCase(item.adresse)}</h3>
            <HeadingLink link={item?.lien_registre_batiments} />
          </hgroup>

          <h4>
            {!!+item?.no_postal && item?.no_postal} {item?.commune}
            <br />
            {item?.nom_npa && t('geneva')}
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
          />

          {isHasLinks(item) && (
            <div className={style.links}>
              {item?.lien_google_maps_url && (
                <a
                  href={item?.lien_google_maps_url}
                  target='_blank'
                  rel='noreferrer'
                  className={style.link}
                >
                  <GoogleMapsIcon />
                  Google Maps
                </a>
              )}

              {item?.lien_map_sitg_url && (
                <a
                  href={item?.lien_map_sitg_url}
                  target='_blank'
                  rel='noreferrer'
                  className={style.link}
                >
                  <StigIcon />
                  STIG
                </a>
              )}
            </div>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default AddressesSection
