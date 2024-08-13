import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import CertificatesList from '../../PlotsPanel/AddressesSection/CertificatesList/CertificatesList'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'

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
  const HeadingLink = () => {
    if (!registerOfBuildingsLink) return null
    return (
      <a target='_blank' href={registerOfBuildingsLink} rel='noreferrer'>
        <Tooltip text='Registre des Bâtiments' top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  return (
    <List title='Address:'>
      <ListItem>
        <hgroup>
          <h3>{address}</h3>
          <HeadingLink />
        </hgroup>

        <h4>
          {commune}, {postCode}
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
                Building: <br /> <b> {buildingNumber}</b>
              </p>
            )}

            {isPPE && (
              <p>
                Building regime type: <br /> <b> {isPPE}</b>
              </p>
            )}

            {buildingTypology && (
              <p>
                Building typology: <br /> <b> {buildingTypology}</b>
              </p>
            )}

            {buildingCategory && (
              <p>
                Building category: <br />
                <b> {buildingCategory}</b>
              </p>
            )}

            {buildingType && (
              <p>
                Building type: <br /> <b> {buildingType}</b>
              </p>
            )}

            {buildingClass && (
              <p>
                Building class: <br /> <b> {buildingClass}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default AddressSection
