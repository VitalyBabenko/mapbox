import { useEffect, useState } from 'react'
import { useEventStore, useModeStore, useFilterStore } from '@store'
import style from './Sidebar.module.scss'
import { counties } from '@constants/countiesSource'
import CountyCard from './CountyCard/CountyCard'
import PlotCard, { PlotCardSkeleton } from './PlotCard/PlotCard'
import BuildingCard, { BuildingCardSkeleton } from './BuildingCard/BuildingCard'
import FilterResults from './FilterResults/FilterResults'
import { useLocale } from '@hooks'
import Pagination from './Pagination/Pagination'
import { EmptyState } from '@components'

const ITEMS_PER_PAGE = 50

const Sidebar = ({ map }) => {
  const { mode, switcher } = useModeStore()
  const { renderedFeatures, renderedFeaturesLoading } = useEventStore()
  const { filtersResult } = useFilterStore()
  const [page, setPage] = useState(1)
  const { t } = useLocale('sidebar')

  const cards = {
    counties: {
      items: counties || [],
      component: CountyCard,
      skeleton: null,
    },
    plots: {
      items: renderedFeatures.filter(f => f?.properties?.EGRID) || [],
      component: PlotCard,
      skeleton: PlotCardSkeleton,
    },
    buildings: {
      items: renderedFeatures.filter(f => f?.properties?.EGID) || [],
      component: BuildingCard,
      skeleton: BuildingCardSkeleton,
    },
  }

  const {
    items,
    component: CardComponent,
    skeleton: SkeletonComponent,
  } = cards[mode]
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const paginatedItems = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    setPage(1)
  }, [renderedFeatures])

  // If there are filter results, show them instead of regular content
  if (filtersResult.length > 0) {
    return (
      <div className={style.sidebar}>
        <FilterResults
          filtersFor={switcher === 'plots' ? 'plots' : 'buildings'}
          map={map}
        />
      </div>
    )
  }

  return (
    <div className={style.sidebar}>
      <h3 className={style.title}>{t(mode)}</h3>

      {renderedFeaturesLoading && SkeletonComponent ? (
        <ul className={style.cards}>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonComponent key={`skeleton-${index}`} />
          ))}
        </ul>
      ) : paginatedItems.length > 0 ? (
        <ul className={style.cards}>
          {paginatedItems.map((item, index) => (
            <CardComponent
              key={
                item.id ||
                item.properties?.EGID ||
                item.properties?.EGRID ||
                index
              }
              item={item}
              map={map}
            />
          ))}
        </ul>
      ) : (
        <EmptyState message={t(`emptyState.${mode}`)} className={style.empty} />
      )}

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

export default Sidebar
