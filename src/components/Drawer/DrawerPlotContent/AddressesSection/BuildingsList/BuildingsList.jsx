import style from './BuildingList.module.scss'
import { useLocale } from '../../../../../hooks'

const BuildingsList = ({ plotInfo, address, buildings }) => {
  const { t } = useLocale('panels.plots')

  const constructionField = (minYear, maxYear) => {
    if (!minYear) return null
    if (!maxYear) return null

    return (
      <p>
        {t('constructionYear')}: <b>{maxYear}</b>
      </p>
    )
  }

  function normalizeHeight(value) {
    if (typeof value !== 'number') return null

    return `${Math.round(value)}m`
  }

  const getCertificatesByBuildingAddress = address => {
    if (!address?.length) return null
    const buildingNumber = address?.split(' ').slice(-1)[0]

    const certs = plotInfo?.construction_certs.filter(item =>
      item.adresse.includes(buildingNumber),
    )

    if (!certs?.length) return null

    return (
      <p className={style.certs}>
        {t('sadLink')}:{' '}
        <div className={style.list}>
          {' '}
          {certs.map((cert, i) => (
            <a
              key={i}
              className={style.link}
              target='_blank'
              href={cert?.url}
              rel='noreferrer'
            >
              <b>
                {cert?.numero}/{cert?.numero_complementaire}
              </b>
            </a>
          ))}
        </div>
      </p>
    )
  }

  if (!buildings) return null
  return (
    <>
      {buildings.map((building, i) => (
        <ul key={i} style={{ marginTop: '16px' }}>
          <li key={building?.egrid && i}>
            {building?.egid && (
              <p>
                EGID: <b>{building?.egid}</b>
              </p>
            )}

            {constructionField(
              building?.min_building_construction_year,
              building?.max_building_construction_year,
            )}

            {address?.surface_brut_de_plancher_hors_sol_m2 ? (
              <p>
                {t('livingSurface')}:{' '}
                <b> {address?.surface_brut_de_plancher_hors_sol_m2}m²</b>
              </p>
            ) : null}

            {address?.typologie_d_immeuble && (
              <p>
                {t('typology')}: <b> {address?.typologie_d_immeuble}</b>
              </p>
            )}

            {building?.statut_du_batiment && (
              <p>
                {t('buildingStatus')}: <b> {building?.statut_du_batiment}</b>
              </p>
            )}

            {address?.indice && (
              <p>
                IDC: <b> {address?.indice}</b>
              </p>
            )}

            {building?.building_apartments_qty && (
              <p>
                {t('apartQyt')}: <b> {building?.building_apartments_qty}</b>
              </p>
            )}

            {address?.niveaux_hors_sol && (
              <p>
                {t('aboveGroundLevels')}: <b> {address?.niveaux_hors_sol}</b>
              </p>
            )}

            {address?.hauteur_immeuble_m && (
              <p>
                {t('buildingHeight')}:{' '}
                <b> {normalizeHeight(address?.hauteur_immeuble_m)}</b>
              </p>
            )}

            {getCertificatesByBuildingAddress(building?.address_name)}
          </li>
        </ul>
      ))}
    </>
  )
}

export default BuildingsList
