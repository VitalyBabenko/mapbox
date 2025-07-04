import React, { useState } from 'react'
import { ListItem, Tooltip } from '../../../../components'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import { IoIosArrowUp as ArrowIcon } from 'react-icons/io'
import style from './CertCard.module.scss'
import { useLocale } from '../../../../hooks/useLocale'

const CertCard = ({ cert }) => {
  const { t } = useLocale('panels.plots')
  const [open, setOpen] = useState(false)
  const capFirst = s => (s ? s[0].toUpperCase() + s.slice(1) : '')

  const HeadingLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} className={style.link} rel='noreferrer'>
        <Tooltip text={t('file')} bottom='-35px' right='-16px'>
          <LinkIcon />
        </Tooltip>
      </a>
    )
  }

  return (
    <ListItem
      onClick={() => setOpen(prev => !prev)}
      className={`${style.card} ${open ? style.open : ''}`}
    >
      <hgroup>
        <h3>
          {t('file')}: {cert?.numero}
        </h3>
        <HeadingLink link={cert?.url} />
        <ArrowIcon className={`${style.arrow} ${open ? style.open : ''}`} />
      </hgroup>

      <h4>
        {cert?.adresse} <br />
        {cert?.commune}, {'Genève'}
      </h4>

      <ul>
        <li>
          {cert?.type && (
            <p>
              {t('type')}: <b>{cert.type}</b>
            </p>
          )}

          {cert?.statut && (
            <p>
              {t('status')}: <b>{cert.statut}</b>
            </p>
          )}

          {cert?.statut_da && (
            <p>
              {t('constructionStatus')}: <b> {cert.statut_da}</b>
            </p>
          )}

          {cert?.numero && (
            <p>
              {t('applicationNumber')}: <b> {cert.numero}</b>
            </p>
          )}

          {cert?.description && (
            <p>
              {t('description')}: <br /> <b> {capFirst(cert.description)}</b>
            </p>
          )}

          {cert?.proprietaire && (
            <p>
              {t('owner')}: <br /> <b> {capFirst(cert.proprietaire)}</b>
            </p>
          )}

          {cert?.proprietaire_adresse && (
            <p>
              {t('ownerAddress')}: <br />{' '}
              <b> {capFirst(cert.proprietaire_adresse)}</b>
            </p>
          )}

          {cert?.mandataire && (
            <p>
              {t('representative')}: <br /> <b> {capFirst(cert.mandataire)}</b>
            </p>
          )}

          {cert?.origine_dossier && (
            <p>
              {t('fileOrigin')}: <b> {cert.origine_dossier}</b>
            </p>
          )}

          {cert?.date_fin_valid_instance_directrice && (
            <p>
              {t('validityEndDate')}:{' '}
              <b> {cert?.date_fin_valid_instance_directrice}</b>
            </p>
          )}
        </li>
      </ul>
    </ListItem>
  )
}

export default CertCard
