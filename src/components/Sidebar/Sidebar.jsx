// import { useEffect, useState } from 'react'
// import { useEventStore, useModeStore } from '../../store'
// import style from './Sidebar.module.scss'
// import { counties } from '../../constants/countiesSource'
// import CountyCard from './CountyCard/CountyCard'
// import PlotCard from './PlotCard/PlotCard'
// import BuildingCard from './BuildingCard/BuildingCard'
// import { useLocale } from '../../hooks'

// const ITEMS_PER_PAGE = 50

// const Sidebar = ({ map }) => {
//   const { mode } = useModeStore()
//   const { renderedFeatures } = useEventStore()
//   const [page, setPage] = useState(1)
//   const { t } = useLocale('sidebar')

//   const cards = {
//     counties: {
//       items: counties || [],
//       component: CountyCard,
//     },
//     plots: {
//       items: renderedFeatures.filter(f => f?.properties?.EGRID) || [],
//       component: PlotCard,
//     },
//     buildings: {
//       items: renderedFeatures.filter(f => f?.properties?.EGID) || [],
//       component: BuildingCard,
//     },
//   }

//   const { items, component: CardComponent } = cards[mode]

//   const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)
//   const paginatedItems = items.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE,
//   )

//   const nextPage = () => setPage(p => Math.min(p + 1, totalPages))
//   const prevPage = () => setPage(p => Math.max(p - 1, 1))

//   useEffect(() => {
//     setPage(1)
//   }, [renderedFeatures])

//   return (
//     <div className={style.sidebar}>
//       <h3 className={style.title}>{t(mode)}</h3>

//       {paginatedItems.length > 0 ? (
//         <ul className={style.cards}>
//           {paginatedItems.map((item, index) => (
//             <CardComponent
//               key={
//                 item.id ||
//                 item.properties?.EGID ||
//                 item.properties?.EGRID ||
//                 index
//               }
//               item={item}
//               map={map}
//             />
//           ))}
//         </ul>
//       ) : (
//         <p className={style.empty}>No data</p>
//       )}

//       {totalPages > 1 && (
//         <div className={style.pagination}>
//           <button onClick={prevPage} disabled={page === 1}>
//             Prev
//           </button>
//           <span>
//             {page} / {totalPages}
//           </span>
//           <button onClick={nextPage} disabled={page === totalPages}>
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Sidebar

import { useEffect, useState } from 'react'
import { useEventStore, useModeStore } from '../../store'
import style from './Sidebar.module.scss'
import { counties } from '../../constants/countiesSource'
import CountyCard from './CountyCard/CountyCard'
import PlotCard from './PlotCard/PlotCard'
import BuildingCard from './BuildingCard/BuildingCard'
import { useLocale } from '../../hooks'
import Pagination from './Pagination/Pagination'

const ITEMS_PER_PAGE = 50

const Sidebar = ({ map }) => {
  const { mode } = useModeStore()
  const { renderedFeatures } = useEventStore()
  const [page, setPage] = useState(1)
  const { t } = useLocale('sidebar')

  const cards = {
    counties: {
      items: counties || [],
      component: CountyCard,
    },
    plots: {
      items: renderedFeatures.filter(f => f?.properties?.EGRID) || [],
      component: PlotCard,
    },
    buildings: {
      items: renderedFeatures.filter(f => f?.properties?.EGID) || [],
      component: BuildingCard,
    },
  }

  const { items, component: CardComponent } = cards[mode]
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE)

  const paginatedItems = items.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  )

  useEffect(() => {
    setPage(1)
  }, [renderedFeatures])

  return (
    <div className={style.sidebar}>
      <h3 className={style.title}>{t(mode)}</h3>

      {paginatedItems.length > 0 ? (
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
        <p className={style.empty}>No data</p>
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
