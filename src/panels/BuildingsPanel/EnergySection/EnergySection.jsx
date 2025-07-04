import ListItem from '../../../components/List/ListItem/ListItem'
import style from './EnergySection.module.scss'
import { useLocale } from '../../../hooks/useLocale'

const EnergySection = ({ heating, hot }) => {
  const { t } = useLocale('panels.buildings')

  if (!heating?.length && !hot?.length) return null

  return (
    <div className={style.energySection}>
      {heating?.length && (
        <ListItem>
          <h3>{t('heating')}</h3>

          {heating.map((item, i) => (
            <ul className={style.heatingList}>
              <li key={i}>
                <p>
                  {t('heatingGenerator')}: <br />{' '}
                  <b>{item.generateur_de_chaleur}</b>
                </p>

                <p>
                  {t('heatingEnergySource')}: <b>{item.source_d_energie}</b>
                </p>

                <p>
                  {t('heatingInfoSource')}: <b> {item.source_d_information}</b>
                </p>

                <p>
                  {t('lastUpdate')}
                  <b> {item.date_de_mise_a_jour}</b>
                </p>
              </li>
            </ul>
          ))}
        </ListItem>
      )}

      {hot?.length && (
        <ListItem>
          <h3>{t('hotWater')}</h3>

          {hot.map((item, i) => (
            <ul className={style.hotList}>
              <li key={i}>
                <p>
                  {t('hotWaterGenerator')}: <br />{' '}
                  <b>{item.generateur_de_chaleur}</b>
                </p>

                <p>
                  {t('hotWaterEnergySource')}: <b>{item.source_d_energie}</b>
                </p>

                <p>
                  {t('hotWaterInfoSource')}: <b> {item.source_d_information}</b>
                </p>

                <p>
                  {t('lastUpdate')}
                  <b> {item.date_de_mise_a_jour}</b>
                </p>
              </li>
            </ul>
          ))}
        </ListItem>
      )}
    </div>
  )
}

export default EnergySection
