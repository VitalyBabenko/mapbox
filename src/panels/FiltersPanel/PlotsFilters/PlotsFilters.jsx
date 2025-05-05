import { memo, useEffect, useRef, useState } from 'react'
import Loader from '../../../components/Loader/Loader'
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage'
import { useToastStore } from '../../../store'
import { useFilterStore } from '../../../store'
import FilterAccordion from '../../../components/Filters/FilterAccordion/FilterAccordion'
import Checkbox from '../../../components/Checkbox/Checkbox'
import { filterService } from '../../../service/filtersService'

const PlotsFilters = ({ setMapLoader, startRequest }) => {
  const submitBtnRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [panelError, setPanelError] = useState('')
  const toast = useToastStore()
  const { filters, setFilters, setFilterValue, setFilteredPlotsFeatures } =
    useFilterStore()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setMapLoader(true)
      const params = filters.getValuesAsParams()
      const signal = startRequest().signal

      const resp = await filterService.setFilters('plots', params, signal)
      if (resp?.error) {
        throw new Error("Une erreur s'est produite, réessayez plus tard")
      }

      toast.success(`${resp?.features?.length} parcelles trouvées`)
      setFilteredPlotsFeatures(resp?.features)
    } catch (err) {
      console.log(err)
      toast.error("Une erreur s'est produite, réessayez plus tard")
    } finally {
      setMapLoader(false)
    }
  }

  useEffect(() => {
    const getFilters = async () => {
      try {
        setIsLoading(true)
        const resp = await filterService.getFilters('plots')
        setFilters(resp)
      } catch (error) {
        setPanelError(
          `Filtering service is unavailable, please try again later.`,
        )
      } finally {
        setIsLoading(false)
      }

      const params = new URLSearchParams(window.location.search)
      if (params.size > 0) {
        submitBtnRef?.current?.click()
      }
    }

    getFilters()
  }, [])

  if (isLoading) return <Loader />
  if (panelError) return <ErrorMessage message={panelError} />

  return (
    <form onSubmit={handleSubmit}>
      {filters.getCheckboxes().map(filter => (
        <Checkbox
          key={filter.id}
          label={filter.title}
          checked={filter.value}
          onChange={e => setFilterValue(filter.id, e.target.checked)}
        />
      ))}

      {filters.getAccordions().map(accordion => (
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
}

export default memo(PlotsFilters)
