import { useEffect, useState } from 'react'
import SpecsSection from './SpecsSection/SpecsSection'
import AddressSection from './AddressSection/AddressSection'
import OwnersSection from './OwnersSection/OwnersSection'
import TransactionsSection from '../DrawerPlotContent/TransactionsSection/TransactionsSection'
import DetailsSection from './DetailsSection/DetailsSection'
import PermitsSection from './PermitsSection/PermitsSection'
import EnergySection from './EnergySection/EnergySection'
import { convertTimeFormat } from '../../../utils/convertTimeFormat'
import { buildingService } from '../../../service/buildingService'
import { useEventStore, useToastStore } from '../../../store'
import HeadingSection from './HeadingSection/HeadingSection'
import { useLocale } from '../../../hooks'
import { List, Tooltip } from '../../../components'
import style from './DrawerBuildingContent.module.scss'

const DrawerBuildingContent = ({ activeBuildingId }) => {
  const [buildingInfo, setBuildingInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useLocale('panels.buildings')
  const { setClickedFeature } = useEventStore()
  const toast = useToastStore()

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
    toast.success(t('copiedToClipboard'))
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const info = await buildingService.getByEgId(activeBuildingId)

      if (info?.error?.message?.length) {
        setError(t('error'))
        setLoading(false)
        return
      }

      setBuildingInfo(info)
      setLoading(false)
    }

    if (activeBuildingId) getData()
  }, [activeBuildingId])

  const getConstructionDate = () => {
    if (!buildingInfo) return null
    const variant1 = buildingInfo?.annee_de_construction
    const variant2 = buildingInfo?.annee_de_construction_du_batiment

    if (variant1?.length) return variant1
    if (variant2?.length) return variant2
    return null
  }

  return (
    <div className={style.buildingContent}>
      {error && (
        <div className={style.error}>
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className={style.loading}>
          <p>Loading...</p>
        </div>
      )}

      {!loading && !error && buildingInfo && (
        <>
          <HeadingSection
            plotId={buildingInfo?.plot?.no_commune_no_parcelle || null}
            buildingId={buildingInfo?.no_batiment || null}
            rdppf={buildingInfo?.plot?.extrait_rdppf_pdf || null}
            isLoading={loading}
          />

          {buildingInfo?.egid && (
            <Tooltip text={t('copyEgid')} bottom='-28px' left='0px'>
              <div className={style.egid}>
                <p
                  onClick={() => copyToClipboard(buildingInfo?.egid)}
                  className={style.egid}
                >
                  <b>EGID</b>: {buildingInfo?.egid}
                </p>
              </div>
            </Tooltip>
          )}

          <SpecsSection
            constructionYear={buildingInfo?.annee_de_construction_du_batiment}
            apartmentsQuantity={buildingInfo?.building_apartments_qty}
            buildingArea={
              buildingInfo?.surface_totale_des_logements_du_batiment_m2 || null
            }
            roomQuantity={
              buildingInfo?.nombre_total_de_pieces_des_logements_du_batiment
            }
          />

          {Array.isArray(buildingInfo?.plot?.zone) && (
            <List title={t('zone')} className={style.zone}>
              {buildingInfo?.plot?.zone?.map(item => (
                <li key={item} className={style.zoneItem}>
                  {item}
                </li>
              ))}
            </List>
          )}

          <AddressSection
            address={buildingInfo?.address_name}
            commune={buildingInfo?.commune_name}
            postCode={buildingInfo?.no_postal}
            buildingNumber={buildingInfo?.no_batiment}
            isPPE={buildingInfo?.plot?.ppe}
            buildingTypology={
              buildingInfo?.getExtendedInfo()?.typologie_d_immeuble
            }
            buildingCategory={
              buildingInfo?.getExtendedInfo()?.categorie_d_immeuble
            }
            buildingType={buildingInfo?.categorie_de_batiment}
            buildingClass={buildingInfo?.classe_de_batiment}
            registerOfBuildingsLink={
              buildingInfo?.getExtendedInfo()?.lien_registre_batiments
            }
            isConstructionCerts={buildingInfo?.plot?.construction_certs?.length}
            buildingInfo={buildingInfo}
          />

          <EnergySection
            heating={buildingInfo?.chauffage}
            hot={buildingInfo?.chaude}
          />

          <DetailsSection
            buildingArea={buildingInfo?.plot?.surface_immeuble_sum}
            plotArea={buildingInfo?.plot?.surface_parcelle_m2}
            livingArea={
              buildingInfo?.getExtendedInfo()
                ?.surface_brut_de_plancher_hors_sol_m2
            }
            buildingAreaOnTheGround={
              buildingInfo?.getExtendedInfo()?.surface_immeuble_au_sol_m2
            }
            totalGroundArea={
              buildingInfo?.getExtendedInfo()?.surface_totale_au_sol_m2
            }
            buildingVolume={buildingInfo?.volume_du_batiment}
            levelsAboveGround={
              buildingInfo?.getExtendedInfo()?.niveaux_hors_sol
            }
            levelsUnderGround={
              buildingInfo?.getExtendedInfo()?.niveaux_sous_sol
            }
            totalLevels={buildingInfo?.nombre_de_niveaux}
            buildingHeight={buildingInfo?.plot?.hauteur_immeuble_m}
            constructionPeriod={
              buildingInfo?.getExtendedInfo()?.epoque_de_construction
            }
            constructionDate={getConstructionDate()}
            renovationDate={buildingInfo?.annee_de_construction_du_batiment}
            demolitionDate={buildingInfo?.annee_de_demolition_du_batiment}
          />

          <OwnersSection owners={buildingInfo?.getOwners()} />

          <TransactionsSection info={buildingInfo?.transactions} />

          <PermitsSection permits={buildingInfo?.plot?.construction_certs} />

          {buildingInfo?.plot?.derniere_modification && (
            <p className={style.lastEdits}>
              {t('lastEdits')}:{' '}
              <b>
                {convertTimeFormat(buildingInfo?.plot?.derniere_modification)}
              </b>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default DrawerBuildingContent
