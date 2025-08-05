import styles from './PublicPlotsSwitcher.module.scss'
import { Switch, Tooltip } from '../../../../components'
import { TbRoad } from 'react-icons/tb'
import { useLocale } from '../../../../hooks'
import { useModeStore } from '../../../../store'

const PublicPlotsSwitcher = () => {
  const { t } = useLocale('buttons.publicPlotsSwitcher')

  const isPublicPlots = useModeStore(state => state.isPublicPlots)
  const togglePublicPlots = useModeStore(state => state.togglePublicPlots)

  return (
    <div className={styles.wrapper}>
      <Tooltip text={t('tooltip')} bottom='-40px' right='-1px'>
        <button className={styles.switcher} onClick={togglePublicPlots}>
          <TbRoad size={20} />
          <p className={styles.text}>{t('text')}</p>

          <Switch checked={isPublicPlots} onChange={togglePublicPlots} />
        </button>
      </Tooltip>
    </div>
  )
}

export default PublicPlotsSwitcher
