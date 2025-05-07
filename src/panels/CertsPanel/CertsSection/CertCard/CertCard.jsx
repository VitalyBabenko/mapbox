import React, { useState } from 'react'
import { ListItem, Tooltip } from '../../../../components'
import { BiLinkExternal as LinkIcon } from 'react-icons/bi'
import { IoIosArrowUp as ArrowIcon } from 'react-icons/io'
import style from './CertCard.module.scss'

const CertCard = ({ cert }) => {
  const [open, setOpen] = useState(false)
  const capFirst = s => (s ? s[0].toUpperCase() + s.slice(1) : '')

  const HeadingLink = ({ link }) => {
    if (!link) return null
    return (
      <a target='_blank' href={link} className={style.link} rel='noreferrer'>
        <Tooltip text='Dossier' bottom='-35px' right='-16px'>
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
        <h3>File: {cert?.numero}</h3>
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
              Type: <b>{cert.type}</b>
            </p>
          )}

          {cert?.statut && (
            <p>
              Status: <b>{cert.statut}</b>
            </p>
          )}

          {cert?.statut_da && (
            <p>
              Construction status: <b> {cert.statut_da}</b>
            </p>
          )}

          {cert?.numero && (
            <p>
              Application number: <b> {cert.numero}</b>
            </p>
          )}

          {cert?.description && (
            <p>
              Description: <br /> <b> {capFirst(cert.description)}</b>
            </p>
          )}

          {cert?.proprietaire && (
            <p>
              Owner: <br /> <b> {capFirst(cert.proprietaire)}</b>
            </p>
          )}

          {cert?.proprietaire_adresse && (
            <p>
              Owner address: <br />{' '}
              <b> {capFirst(cert.proprietaire_adresse)}</b>
            </p>
          )}

          {cert?.mandataire && (
            <p>
              Representative: <br /> <b> {capFirst(cert.mandataire)}</b>
            </p>
          )}

          {cert?.origine_dossier && (
            <p>
              File origin: <b> {cert.origine_dossier}</b>
            </p>
          )}

          {cert?.date_fin_valid_instance_directrice && (
            <p>
              Validity end date:{' '}
              <b> {cert?.date_fin_valid_instance_directrice}</b>
            </p>
          )}
        </li>
      </ul>
    </ListItem>
  )
}

export default CertCard
