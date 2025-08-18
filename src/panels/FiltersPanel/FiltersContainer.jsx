import { memo, useState } from 'react'
import { FiltersModal, FiltersButton } from './index'

const FiltersContainer = ({
  filtersFor = 'plots',
  resetViewButtonRef,
  buttonPosition = { top: 49, left: 10 },
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <FiltersButton
        onClick={handleOpenModal}
        className={className}
        buttonPosition={buttonPosition}
      />
      <FiltersModal
        filtersFor={filtersFor}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        resetViewButtonRef={resetViewButtonRef}
      />
    </>
  )
}

export default memo(FiltersContainer)
