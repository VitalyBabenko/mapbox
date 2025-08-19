import List from '../../../../components/List/List'
import ListItem from '../../../../components/List/ListItem/ListItem'
import CertificatesList from '../../DrawerPlotContent/AddressesSection/CertificatesList/CertificatesList'
import Tooltip from '../../../../components/Tooltip/Tooltip'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import { useLocale } from '../../../../hooks/useLocale'

const AddressSection = ({
  address,
  commune,
  postCode,
  buildingNumber,
  isPPE,
  buildingTypology,
  buildingCategory,
  buildingType,
  buildingClass,
  registerOfBuildingsLink,
  isConstructionCerts,
  buildingInfo,
}) => {
  const { t } = useLocale('panels.buildings')

  const HeadingLink = () => {
    if (!registerOfBuildingsLink) return null
    return (
      <a target='_blank' href={registerOfBuildingsLink} rel='noreferrer'>
        <Tooltip text={t('registerOfBuildings')} top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  return (
    <List>
      <ListItem>
        <hgroup>
          <h3>{address}</h3>
          <HeadingLink />
        </hgroup>

        <h4>
          {postCode} {commune}
          {commune === 'Genève' ? '' : ','}
          <br />
          {commune === 'Genève' ? '' : 'Genève'}
        </h4>

        <CertificatesList
          isMinergie={
            buildingInfo?.getExtendedInfo()?.certificat_minergie_details
          }
          isConstructionCerts={isConstructionCerts}
          isPpe={isPPE}
        />

        <ul style={{ marginTop: '15px' }}>
          <li style={{ gap: '8px' }}>
            {buildingNumber && (
              <p>
                {t('building')}: <br /> <b> {buildingNumber}</b>
              </p>
            )}

            {isPPE && (
              <p>
                {t('buildingRegimeType')}: <br /> <b> {isPPE}</b>
              </p>
            )}

            {buildingTypology && (
              <p>
                {t('buildingTypology')}: <br /> <b> {buildingTypology}</b>
              </p>
            )}

            {buildingCategory && (
              <p>
                {t('buildingCategory')}: <br />
                <b> {buildingCategory}</b>
              </p>
            )}

            {buildingType && (
              <p>
                {t('buildingType')}: <br /> <b> {buildingType}</b>
              </p>
            )}

            {buildingClass && (
              <p>
                {t('buildingClass')}: <br /> <b> {buildingClass}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default AddressSection
