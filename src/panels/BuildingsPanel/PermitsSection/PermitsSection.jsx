import List from '../../../components/List/List'
import ListItem from '../../../components/List/ListItem/ListItem'
import Tooltip from '../../../components/Tooltip/Tooltip'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import style from './PermitsSection.module.scss'
import { useLocale } from '../../../hooks'

const PermitsSection = ({ permits }) => {
  const { t } = useLocale('panels.buildings')

  const lastPermit = permits
    ?.filter(p => p?.date_statut)
    ?.sort((a, b) => new Date(b.date_statut) - new Date(a.date_statut))[0]

  const HeadingLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} rel='noreferrer'>
        <Tooltip text='Link SAD' top='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  if (!lastPermit) return null
  return (
    <List title={t('lastBuildingPermit')}>
      <ListItem>
        {lastPermit?.url && (
          <hgroup className={style.hgroup}>
            <HeadingLink link={lastPermit?.url} />
          </hgroup>
        )}

        <ul>
          <li>
            {lastPermit?.date_statut && (
              <p>
                {t('date')}: <b> {lastPermit.date_statut}</b>
              </p>
            )}

            {lastPermit?.type && (
              <p>
                {t('buildingPermitType')}: <b> {lastPermit.type}</b>
              </p>
            )}

            {lastPermit?.numero && (
              <p>
                {t('permitNumber')}: <b> {lastPermit.numero}</b>
              </p>
            )}
          </li>
        </ul>
      </ListItem>
    </List>
  )
}

export default PermitsSection
