import React from 'react'
import { IoStatsChart as StatsIcon } from 'react-icons/io5'
import { RiCloseLine as CloseIcon } from 'react-icons/ri'
import useLocalStorage from '../../../hooks/useLocalStorage'

import styles from './CountyStatsButton.module.scss'
import CountyStatsPanel from '../CountyStatsPanel'
import { useModeStore } from '@/store'

const CountyStatsButton = () => {
  const { county } = useModeStore()
  const [open, setOpen] = useLocalStorage('county-stats-panel-open', false)

  const handleClick = () => {
    setOpen(!open)
  }

  if (!county) return null

  return (
    <>
      <button className={styles.button} onClick={handleClick}>
        {open ? <CloseIcon size={22} /> : <StatsIcon size={16} />}
      </button>

      <CountyStatsPanel open={open} setOpen={setOpen} county={county} />
    </>
  )
}

export default CountyStatsButton
