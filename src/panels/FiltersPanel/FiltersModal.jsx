import { memo, useEffect, useState } from 'react'
import { IoFilter as FilterIcon } from 'react-icons/io5'
import { useFilterStore, useModeStore, useToastStore } from '../../store'
import FiltersResult from './FiltersResult/FiltersResult'
import { TbZoomCancel as StopIcon } from 'react-icons/tb'
import { Modal, Tooltip, Loader } from '../../components'
import style from './FiltersModal.module.scss'
import { filterService } from '../../service/filtersService'
import FilterAccordion from '../../components/Filters/FilterAccordion/FilterAccordion'
import { IoIosInformationCircleOutline as InfoIcon } from 'react-icons/io'
import Switch from '../../components/Switch/Switch'
import { useLocale } from '../../hooks'
import { removeQueryParams } from '../../utils/removeQueryParams'
import { MODES } from '../../constants'
import { getCountyByName } from '../../utils/getCountyByName'
import { useMap } from 'react-map-gl'
import bbox from '@turf/bbox'
import { delay } from '../../utils/delay'

const FiltersModal = ({
  filtersFor = 'plots',
  isOpen = false,
  onClose,
  resetViewButtonRef,
}) => {
  const [loading, setLoading] = useState(true)
  const [mapLoading, setMapLoading] = useState(false)
  const [error, setError] = useState('')
  const [controller, setController] = useState(null)
  const { t } = useLocale('panels.filters')
  const toast = useToastStore()
  const { current: map } = useMap()
  const {
    filters,
    setFilters,
    filtersResult,
    setFiltersResult,
    setFilterValue,
  } = useFilterStore()
  const { county, switcher, switchToPlotsMode, switchToBuildingsMode } =
    useModeStore()

  const clearQueryParamsOnClose = () => {
    const url = window.location.href
    const cleanedUrl = removeQueryParams(url)
    window.history.replaceState({}, '', cleanedUrl)
  }

  const handleClose = () => {
    clearQueryParamsOnClose()
    onClose()
  }

  const handleCancel = () => {
    if (filters.length) {
      filters.forEach(filter => {
        if (filter.value !== false) {
          setFilterValue(filter.id, false)
        }
      })
    }
    onClose()
  }

  const handleApply = async () => {
    try {
      setLoading(true)
      setMapLoading(true)

      const newController = new AbortController()
      setController(newController)
      const signal = newController.signal

      const resp = await filterService.fetchResults(filtersFor, filters, signal)

      if (resp?.error) {
        if (resp?.error?.message === 'canceled') {
          setError('')
          toast.text(t('toast.canceled'))
        } else {
          setError(resp?.error?.message)
          toast.error(t('toast.error'))
        }
      } else {
        setFiltersResult(resp?.features)
        toast.success(t('toast.success', { count: resp?.features?.length }))

        // Close modal if there are results
        if (resp?.features?.length > 0) {
          onClose()
        }
      }
    } catch (err) {
      toast.error(t('toast.error'))
      setError(err)
    } finally {
      setLoading(false)
      setMapLoading(false)

      const countyFilter = filters.find(f => f.attribute === 'commune_name')
      const searchedCounty = countyFilter?.value?.[0]?.label

      if (searchedCounty) {
        const countyFeature = getCountyByName(searchedCounty)

        await delay(1000)

        const [minLng, minLat, maxLng, maxLat] = bbox(countyFeature)
        map.fitBounds(
          [
            [minLng, minLat],
            [maxLng, maxLat],
          ],
          { padding: 0, duration: 1500, zoom: 13 },
        )

        if (switcher === MODES.PLOTS) {
          switchToPlotsMode(countyFeature)
        } else {
          switchToBuildingsMode(countyFeature)
        }
      }
    }
  }

  const cancelSearch = () => {
    if (controller) {
      controller.abort()
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchFilters = async () => {
      setError('')
      setLoading(true)
      const resp = await filterService.fetchFilters(filtersFor)
      resp?.error ? setError(resp.error) : setFilters(resp)

      setLoading(false)
    }

    if (isOpen) {
      fetchFilters()
    }
  }, [filtersFor, isOpen, setFilters])

  const modalTitle = (
    <>
      <FilterIcon size={20} />
      {t('title')}
    </>
  )

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={modalTitle}
        size='medium'
        className={style.filtersModal}
      >
        {error ? (
          <div className={style.errorContainer}>
            <p>{error}</p>
          </div>
        ) : loading ? (
          <div className={style.loadingContainer}>
            <div className={style.loaderWrapper}>
              <Loader />
            </div>
            {mapLoading && (
              <button
                onClick={cancelSearch}
                className={style.cancelSearchButton}
              >
                <StopIcon />
                {t('buttons.cancelSearch')}
              </button>
            )}
          </div>
        ) : filtersResult.length ? (
          <FiltersResult filtersFor={filtersFor} />
        ) : (
          filters.length && (
            <div className={style.filtersContent}>
              <div className={style.checkboxesContainer}>
                <p className={style.checkboxesTitle}>{t('checkboxes.title')}</p>
                <Tooltip
                  text={t('checkboxes.info')}
                  left='-210px'
                  bottom='-55px'
                  className={style.infoIcon}
                >
                  <InfoIcon size={22} />
                </Tooltip>
              </div>
              {filters?.getCheckboxes().map(filter => (
                <Switch
                  key={filter.id}
                  label={filter.title}
                  checked={filter.value}
                  onChange={e => setFilterValue(filter.id, e.target.checked)}
                />
              ))}

              {filters?.getAccordions().map(accordion => (
                <FilterAccordion
                  key={accordion.title}
                  title={accordion.title}
                  filters={accordion.filters}
                />
              ))}

              <div className={style.buttonsContainer}>
                <button
                  type='button'
                  onClick={handleCancel}
                  className={style.cancelButton}
                >
                  {t('buttons.cancel')}
                </button>
                <button
                  type='button'
                  onClick={handleApply}
                  className={style.applyButton}
                  disabled={loading}
                >
                  {loading ? t('buttons.loading') : t('buttons.apply')}
                </button>
              </div>
            </div>
          )
        )}
      </Modal>
    </>
  )
}

export default memo(FiltersModal)
