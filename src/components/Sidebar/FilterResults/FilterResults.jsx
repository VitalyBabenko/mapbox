import { useState, useEffect } from 'react'
import style from './FilterResults.module.scss'
import { INITIAL_VIEW } from '@constants/index'
import { useEventStore, useFilterStore, useModeStore } from '@store'
import bbox from '@turf/bbox'
import PlotCard from '../PlotCard/PlotCard'
import BuildingCard from '../BuildingCard/BuildingCard'
import { useLocale } from '@hooks/useLocale'
import Pagination from '../Pagination/Pagination'

const ITEMS_PER_PAGE = 50

const FilterResults = ({ filtersFor, map }) => {
  const { t } = useLocale('panels.filters')
  const { filtersResult, setFiltersResult } = useFilterStore()
  const { switchToCountiesMode } = useModeStore()
  const { setClickedFeature } = useEventStore()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(filtersResult.length / ITEMS_PER_PAGE)
  const paginatedItems = filtersResult.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  const handleReset = () => {
    setClickedFeature(null)
    setFiltersResult([])
    switchToCountiesMode()
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })
    const url = new URL(window.location.href)
    url.search = ''
    window.history.replaceState({}, '', url)
  }

  const getTitle = () => {
    let item = ''
    switch (filtersFor) {
      case 'buildings':
        item = 'bâtiment(s)'
        break
      case 'transactions':
        item = 'transaction(s)'
        break
      case 'construction-certs':
        item = 'certificat(s)'
        break
      default:
        item = 'parcelle(s)'
    }
    return `${t('results.title')} ${filtersResult?.length} ${item}`
  }

  useEffect(() => {
    setPage(1)
  }, [filtersResult])

  if (!filtersResult.length) {
    return null
  }

  return (
    <div className={style.filterResults}>
      <div className={style.header}>
        <h3 className={style.title}>{getTitle()}</h3>
        <button className={style.resetButton} onClick={handleReset}>
          {t('buttons.reset')}
        </button>
      </div>

      <ul className={style.cards}>
        {paginatedItems.map((feature, index) => {
          if (
            filtersFor === 'plots' ||
            filtersFor === 'transactions' ||
            filtersFor === 'construction-certs'
          ) {
            return (
              <PlotCard
                key={feature.properties?.EGRID || index}
                item={feature}
                map={map}
              />
            )
          }

          if (filtersFor === 'buildings') {
            return (
              <BuildingCard
                key={feature.properties?.EGID || index}
                item={feature}
                map={map}
              />
            )
          }

          return null
        })}
      </ul>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}

export default FilterResults
