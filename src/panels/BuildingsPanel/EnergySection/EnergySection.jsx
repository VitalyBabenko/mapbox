import ListItem from '../../../components/List/ListItem/ListItem'
import style from './EnergySection.module.scss'

const EnergySection = ({ heating, hot }) => {
  return (
    <div className={style.energySection}>
      {heating?.length && (
        <ListItem>
          <h3>Chauffage</h3>

          {heating.map((item, i) => (
            <ul className={style.heatingList}>
              <li key={i}>
                <p>
                  Générateur de chaleur: <br />{' '}
                  <b>{item.generateur_de_chaleur}</b>
                </p>

                <p>
                  Source d'énergie: <b>{item.source_d_energie}</b>
                </p>

                <p>
                  Source de l'information: <b> {item.source_d_information}</b>
                </p>

                <p>
                  Dernière mise à jour:
                  <b> {item.date_de_mise_a_jour}</b>
                </p>
              </li>
            </ul>
          ))}
        </ListItem>
      )}

      {hot?.length && (
        <ListItem>
          <h3>Eau chaude</h3>

          {hot.map((item, i) => (
            <ul className={style.hotList}>
              <li key={i}>
                <p>
                  Eau chaude: <br /> <b>{item.generateur_de_chaleur}</b>
                </p>

                <p>
                  Source d'énergie: <b>{item.source_d_energie}</b>
                </p>

                <p>
                  Source d'information: <b> {item.source_d_information}</b>
                </p>

                <p>
                  Dernière mise à jour:
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
