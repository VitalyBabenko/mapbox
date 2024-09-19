import RangeSlider from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css'
import style from './RangeFilter.module.scss'
import { memo } from 'react'

const RangeFilter = ({ label, value, setValue, min, max, icon }) => {
  const handleMinInputChange = e => {
    const newValue = parseInt(e.target.value.replace(/\s/g, '')) || 0
    setValue([newValue, value[1]])
  }

  const handleMaxInputChange = e => {
    const newValue = parseInt(e.target.value.replace(/\s/g, '')) || 0
    setValue([value[0], newValue])
  }

  return (
    <>
      <h4>{label}</h4>
      <div className={style.inputs}>
        <input
          value={
            value[0]
              ? value[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              : ''
          }
          onChange={handleMinInputChange}
        />
        {icon ? icon : null}

        <input
          value={
            value[1]
              ? value[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
              : ''
          }
          onChange={handleMaxInputChange}
        />
        {icon ? icon : null}
      </div>

      <RangeSlider
        className={style.slider}
        value={value}
        onInput={setValue}
        min={min}
        max={max}
      />
    </>
  )
}

export default memo(RangeFilter)
