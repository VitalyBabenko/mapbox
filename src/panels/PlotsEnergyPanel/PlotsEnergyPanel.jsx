import { useEffect, useState } from 'react'
import HeadingSection from '../PlotsPanel/HeadingSection/HeadingSection'
import style from './PlotsEnergyPanel.module.scss'
import useDraggable from '../../hooks/useDraggable'
import { useEventStore } from '../../store'
import { plotService } from '../../service/plotService'
import { ErrorMessage } from '../../components'

const PlotsEnergyPanel = ({ activePlotId }) => {
  const { position, handleMouseDown } = useDraggable({ x: -50, y: 50 })
  const [plotInfo, setPlotInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { setClickedFeature, setClickedPlotInfo } = useEventStore()
  const closePlotPanel = () => setClickedFeature(null)

  useEffect(() => {
    const getData = async () => {
      setError(null)
      setIsLoading(true)
      const info = await plotService.getPlotByEgrId(activePlotId)

      if (info?.error?.message?.length) {
        setError('Building information is unavailable. Please try again later.')
        setIsLoading(false)
        return
      }

      setPlotInfo(info)
      setClickedPlotInfo(info)
      setIsLoading(false)
    }

    if (activePlotId) getData()
  }, [activePlotId])

  if (!activePlotId) return null

  if (error)
    return (
      <div className={style.panel}>
        <ErrorMessage
          message='Plot information is unavailable. Please try again later.'
          onClose={closePlotPanel}
        />
      </div>
    )

  return (
    <div
      className={style.panel}
      style={{
        overflow: isLoading ? 'hidden' : 'auto',
        top: position.y,
        right: -position.x,
      }}
    >
      <HeadingSection
        plotInfo={plotInfo}
        isLoading={isLoading}
        closePlotPanel={closePlotPanel}
        handleMouseDown={handleMouseDown}
      />
    </div>
  )
}

export default PlotsEnergyPanel
