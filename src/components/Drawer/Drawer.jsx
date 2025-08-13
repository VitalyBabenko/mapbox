import { useDrawerStore } from '../../store'
import styles from './Drawer.module.scss'

function Drawer() {
  const { isOpen, contentComponent: Content, props } = useDrawerStore()

  const containerClasses = `${styles.drawerContainer} ${
    isOpen ? styles.open : ''
  }`

  return (
    <div className={containerClasses}>
      <div className={styles.drawerContent}>
        <div className={styles.drawerBody}>
          {Content && <Content {...props} />}
        </div>
      </div>
    </div>
  )
}

export default Drawer
