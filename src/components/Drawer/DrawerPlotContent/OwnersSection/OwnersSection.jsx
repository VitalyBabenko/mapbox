import { calculateAge } from '../../../../utils/calculateAge'
import { convertTimeFormat } from '../../../../utils/convertTimeFormat'
import { List, ListItem, Tooltip } from '../../../../components'
import { useLocale } from '../../../../hooks'
import style from './OwnersSection.module.scss'

const OwnersSection = ({ plotInfo }) => {
  const { t } = useLocale('panels.plots')

  if (!plotInfo?.owners?.length) return null
  return (
    <List title={t('owners')}>
      {plotInfo.owners.map((owner, i) => (
        <ListItem key={`${owner?.name} ${i}`} className={style.owner}>
          {owner?.name && (
            <h3>
              {owner.name}{' '}
              <Tooltip text={t('searchLink')} bottom='-40px' right='0'>
                <a
                  href={owner?.owner_contacts_url}
                  target='_blank'
                  rel='noreferrer'
                  className={style.searchLink}
                >
                  search.ch
                </a>
              </Tooltip>{' '}
            </h3>
          )}

          {owner?.date_de_naissance && (
            <ul>
              <li>
                <p>
                  {t('dateOfBirth')}:{' '}
                  <b>{convertTimeFormat(owner?.date_de_naissance)}</b> (
                  {calculateAge(owner?.date_de_naissance)} {t('yearsOld')})
                </p>
              </li>
            </ul>
          )}
        </ListItem>
      ))}
    </List>
  )
}

export default OwnersSection
