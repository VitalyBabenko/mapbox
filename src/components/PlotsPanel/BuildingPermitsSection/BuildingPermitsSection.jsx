import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import Tooltip from '../../Tooltip/Tooltip'
import List from '../../List/List'
import ListItem from '../../List/ListItem/ListItem'

// building with construction_certs: Route de malagnou 17

const BuildingPermitsSection = ({ plotInfo }) => {
  const certificates = plotInfo?.construction_certs || []

  console.log(certificates)

  const CertificateLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} rel='noreferrer'>
        <Tooltip
          text="Full details on the government's website"
          top='-35px'
          right='-16px'
        >
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  if (!certificates.length) return null
  return (
    <List title='Building permit(s):'>
      {certificates.map((cert, i) => (
        <ListItem key={i}>
          <hgroup>
            <h3>File: {cert?.numero}</h3>

            <CertificateLink link={cert?.url} />
          </hgroup>

          <ul style={{ gap: '4px' }}>
            <li>
              {cert?.statut_dossier && (
                <p>
                  Status: <b>{cert.statut_dossier}</b>
                </p>
              )}

              <p>
                Active:
                {cert?.date_depot && (
                  <>
                    {' '}
                    from <b>{cert?.date_depot}</b>
                  </>
                )}
                {cert?.date_statut && (
                  <>
                    {' '}
                    to <b>{cert?.date_statut}</b>
                  </>
                )}
              </p>
            </li>
          </ul>
        </ListItem>
      ))}
    </List>
  )
}

export default BuildingPermitsSection
