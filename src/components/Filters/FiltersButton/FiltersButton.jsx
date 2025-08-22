import { useState } from 'react'
import FiltersModal from '../FiltersModal/FiltersModal'
import style from './FiltersButton.module.scss'
import { IoFilter as FilterIcon } from 'react-icons/io5'

const FiltersButton = ({
  filtersFor = 'plots',
  resetViewButtonRef,
  className,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <button
        className={`${style.filtersButton} ${className}`}
        onClick={handleOpenModal}
        title='Filters'
      >
        <FilterIcon size={19} />
        Filters
      </button>
      <FiltersModal
        filtersFor={filtersFor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        resetViewButtonRef={resetViewButtonRef}
      />
    </>
  )
}

export default FiltersButton
