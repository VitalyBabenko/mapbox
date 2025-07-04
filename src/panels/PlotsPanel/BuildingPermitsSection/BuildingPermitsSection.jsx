import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import Tooltip from '../../../components/Tooltip/Tooltip'
import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import { useLocale } from '../../../hooks/useLocale'

const BuildingPermitsSection = ({ plotInfo }) => {
  const { t } = useLocale('panels.plots')
  const certificates = plotInfo?.construction_certs || []

  const CertificateLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} rel='noreferrer'>
        <Tooltip text={t('buildingPermitsDetails')} top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  if (!certificates.length) return null
  return (
    <List title={t('buildingPermits')}>
      {certificates.map((cert, i) => (
        <ListItem key={i}>
          <hgroup>
            <h3>
              {t('file')}: {cert?.numero}
            </h3>

            <CertificateLink link={cert?.url} />
          </hgroup>

          <ul style={{ gap: '4px' }}>
            <li>
              {cert?.statut_dossier && (
                <p>
                  {t('status')}: <b>{cert.statut_dossier}</b>
                </p>
              )}

              <p>
                {t('active')}:
                {cert?.date_depot && (
                  <>
                    {' '}
                    {t('from')}: <b>{cert?.date_depot}</b>
                  </>
                )}
                {cert?.date_statut && (
                  <>
                    {' '}
                    {t('to')}: <b>{cert?.date_statut}</b>
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
