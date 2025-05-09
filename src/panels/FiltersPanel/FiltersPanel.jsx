import { memo, useEffect, useRef, useState } from 'react'
import { IoFilter as FilterIcon } from 'react-icons/io5'
import { useFilterStore, useToastStore } from '../../store'
import FiltersResult from './FiltersResult/FiltersResult'
import { TbZoomCancel as StopIcon } from 'react-icons/tb'
import { Checkbox, Panel } from '../../components'
import style from './FiltersPanel.module.scss'
import { filterService } from '../../service/filtersService'
import FilterAccordion from '../../components/Filters/FilterAccordion/FilterAccordion'

const FiltersPanel = ({
  filtersFor = 'plots',
  panelPosition = { x: 10, y: 50 },
  panelSide = 'left',
  buttonPosition = { top: 49, left: 10 },
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mapLoading, setMapLoading] = useState(false)
  const [error, setError] = useState('')
  const [controller, setController] = useState(null)
  const submitBtnRef = useRef(null)
  const toast = useToastStore()
  const {
    filters,
    setFilters,
    filtersResult,
    setFiltersResult,
    setFilterValue,
  } = useFilterStore()

  const handleSubmit = async e => {
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
          toast.text('Requête annulée')
        } else {
          setError(resp?.error?.message)
          toast.error("Une erreur s'est produite, réessayez plus tard")
        }
      } else {
        setFiltersResult(resp?.features)
        toast.success(`${resp?.features?.length} parcelles trouvées`)
      }
    } catch (err) {
      toast.error('Erreur réseau ou requête annulée')
      setError(err)
    } finally {
      setLoading(false)
      setMapLoading(false)
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

    fetchFilters()
  }, [filtersFor, open, filtersResult])

  return (
    <>
      <Panel
        open={open}
        setOpen={setOpen}
        loading={loading}
        error={error}
        className={style.filterPanel}
        panelPosition={panelPosition}
        panelSide={panelSide}
        buttonText='Filters'
        buttonIcon={<FilterIcon size={19} />}
        buttonPosition={buttonPosition}
        heading={
          <>
            <FilterIcon size={20} />
            <h2>Filters</h2>
          </>
        }
      >
        {filtersResult.length ? (
          <FiltersResult filtersFor={filtersFor} />
        ) : (
          filters.length && (
            <form onSubmit={handleSubmit}>
              {filters?.getCheckboxes().map(filter => (
                <Checkbox
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

              <div>
                <button ref={submitBtnRef} type='submit'>
                  Apply
                </button>
              </div>
            </form>
          )
        )}
      </Panel>

      {mapLoading && (
        <button onClick={cancelSearch} className={style.stopQuery}>
          <StopIcon />
          Cancel search
        </button>
      )}
    </>
  )
}

export default memo(FiltersPanel)
