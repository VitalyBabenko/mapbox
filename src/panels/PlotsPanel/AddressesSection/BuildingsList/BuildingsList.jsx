import style from './BuildingList.module.scss'

const BuildingsList = ({ plotInfo, address, buildings, locale }) => {
  const titles = {
    livingSurface: {
      en: 'Gross Floor Surface Above Ground (m2):',
      fr: 'Surface Brut de Plancher Hors Sol (m2):',
      de: 'Oberirdische Bruttogeschossfläche (m2):',
    },
    typology: {
      en: 'Building Typology:',
      fr: 'Typologie d’Immeuble:',
      de: 'Gebäudetypologie:',
    },

    buildingStatus: {
      en: 'Building Status:',
      fr: 'Statut du Bâtiment:',
      de: 'Gebäudestatus:',
    },

    sadLink: {
      en: 'Links SAD:',
      fr: 'Liens SAD:',
      de: 'Links SAD:',
    },
    apartQyt: {
      en: 'Building Apartments Qty:',
      fr: `Qté d'Appartements dans le Bâtiment:`,
      de: 'Gebäude Wohnungen Qty:',
    },
  }

  const constructionField = (minYear, maxYear) => {
    if (!minYear) return null
    if (!maxYear) return null

    return (
      <p>
        Construction year: <b>{maxYear}</b>
      </p>
    )
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
        {titles.sadLink[locale]}{' '}
        <div className={style.list}>
          {' '}
          {certs.map(cert => (
            <a
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
        <ul style={{ marginTop: '16px' }}>
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
                {titles.livingSurface[locale]}{' '}
                <b> {address?.surface_brut_de_plancher_hors_sol_m2}m²</b>
              </p>
            ) : null}

            {address?.typologie_d_immeuble && (
              <p>
                {titles.typology[locale]}{' '}
                <b> {address?.typologie_d_immeuble}</b>
              </p>
            )}

            {building?.statut_du_batiment && (
              <p>
                {titles.buildingStatus[locale]}{' '}
                <b> {building?.statut_du_batiment}</b>
              </p>
            )}

            {address?.indice && (
              <p>
                IDC: <b> {address?.indice}</b>
              </p>
            )}

            {building?.building_apartments_qty && (
              <p>
                {titles.apartQyt[locale]}{' '}
                <b> {building?.building_apartments_qty}</b>
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
