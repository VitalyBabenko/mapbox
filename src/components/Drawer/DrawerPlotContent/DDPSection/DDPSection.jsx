import { List, ListItem, Tooltip } from '../../../../components'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import style from './DDPSection.module.scss'
import { convertTimeFormat } from '../../../../utils/convertTimeFormat'
import { useLocale } from '../../../../hooks'

const DDPSection = ({ info }) => {
  const { t } = useLocale('panels.plots')
  if (!info?.ddp_ind) return null

  const GovLink = () => {
    if (!info?.lien_ddp) return null
    return (
      <a target='_blank' href={info?.lien_ddp} rel='noreferrer'>
        <Tooltip text={t('ddpDetails')} top='-35px' right='-16px'>
          <LinkIcon className={style.linkIcon} color='#475467' size={20} />
        </Tooltip>
      </a>
    )
  }

  return (
    <section className={style.section}>
      <List className={style.list}>
        <ListItem>
          <GovLink />

          <ul>
            <h3>{t('ddpTitle')}</h3>
            {info?.genre_ddp && (
              <li>
                <p>
                  {t('rightToSurface')}: <b>{info?.genre_ddp}</b>
                </p>
              </li>
            )}

            {info?.date_ddp && (
              <li>
                <p>
                  {t('effectiveDate')}:{' '}
                  <b>{convertTimeFormat(info?.date_ddp)}</b>
                </p>
              </li>
            )}

            {info?.validite_ddp && (
              <li>
                <p>
                  {t('validity')}: <b>{info?.validite_ddp}</b>
                </p>
              </li>
            )}

            {info?.type_propriete_ddp && (
              <li>
                <p>
                  {t('typeOfOwnership')}: <b>{info.type_propriete_ddp}</b>
                </p>
              </li>
            )}

            {info?.surface_ddp_m2 && (
              <li>
                <p>
                  {t('areaCoveredByDDP')}: <b>{info.surface_ddp_m2}m²</b>
                </p>
              </li>
            )}

            {info?.provenance_ddp && (
              <li>
                <p>
                  {t('provenance')}: <b>{info.provenance_ddp}</b>
                </p>
              </li>
            )}
          </ul>
        </ListItem>
      </List>
    </section>
  )
}

export default DDPSection
