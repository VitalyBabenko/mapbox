import { memo, useEffect, useState } from 'react'
import SpecsSection from './SpecsSection/SpecsSection'
import style from './PlotsPanel.module.scss'
import AddressesSection from './AddressesSection/AddressesSection'
import OwnersSection from './OwnersSection/OwnersSection'
import TransactionsSection from './TransactionsSection/TransactionsSection'
import NotesSection from './NotesSection/NotesSection'
import { convertTimeFormat } from '../../utils/convertTimeFormat'
import List from '../../components/List/List'
import { plotService } from '../../service/plotService'
import { useEventStore, useToastStore } from '../../store'
import HeadingSection from './HeadingSection/HeadingSection'
import DDPSection from './DDPSection/DDPSection'
import { Panel, Tooltip } from '../../components'
import CertsSection from './CertsSection/CertsSection'
import { useLocale } from '../../hooks/useLocale'
import LinksSection from './LinksSection/LinksSection'

const PlotsPanel = ({ activePlotId }) => {
  const [plotInfo, setPlotInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useLocale('panels.plots')
  const { setClickedFeature, setClickedPlotInfo } = useEventStore()
  const open = !!activePlotId
  const closePanel = () => setClickedFeature(null)
  const toast = useToastStore()

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
    toast.success(t('copiedToClipboard'))
  }

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      if (info?.error?.message?.length) {
        setError(t('error'))
        setLoading(false)
        return
      }

      setPlotInfo(info)
      setClickedPlotInfo(info)
      setLoading(false)
    }

    if (activePlotId) getData()
  }, [activePlotId])

  return (
    <Panel
      open={open}
      setOpen={closePanel}
      loading={loading}
      error={error}
      heading={<HeadingSection plotInfo={plotInfo} isLoading={loading} />}
      panelPosition={{ x: -50, y: 50 }}
      panelSide='right'
      className={style.plotPanel}
    >
      {plotInfo?.egrid && (
        <Tooltip text={t('copyEgrid')} bottom='-28px' left='0px'>
          <div className={style.egrid}>
            <p
              onClick={() => copyToClipboard(plotInfo?.egrid)}
              className={style.egrid}
            >
              <b>EGRID</b>: {plotInfo?.egrid}
            </p>
          </div>
        </Tooltip>
      )}

      <SpecsSection plotInfo={plotInfo} />

      <LinksSection
        landRegistryUrl={plotInfo?.lien_rf_url}
        rdppfUrl={plotInfo?.extrait_rdppf_pdf}
      />

      <NotesSection plotInfo={plotInfo} />

      <DDPSection info={plotInfo?.ddp} />

      {Array.isArray(plotInfo?.zone) && (
        <List title={t('zone')} className={style.zone}>
          {plotInfo?.zone?.map(item => (
            <li key={item} className={style.zoneItem}>
              {item}
            </li>
          ))}
        </List>
      )}

      <AddressesSection info={plotInfo} />

      <OwnersSection plotInfo={plotInfo} />

      <TransactionsSection info={plotInfo} />

      <CertsSection info={plotInfo} />

      {plotInfo?.derniere_modification && (
        <p className={style.lastEdits}>
          {t('lastEdits')}:{' '}
          <b>{convertTimeFormat(plotInfo?.derniere_modification)}</b>
        </p>
      )}
    </Panel>
  )
}

export default memo(PlotsPanel)
