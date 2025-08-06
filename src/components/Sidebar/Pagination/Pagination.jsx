import style from './Pagination.module.scss'

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const getPaginationRange = () => {
    const range = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) range.push(i)
    } else {
      if (page <= 3) {
        range.push(1, 2, 3, 4, '...', totalPages)
      } else if (page >= totalPages - 2) {
        range.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        )
      } else {
        range.push(1, '...', page - 1, page, page + 1, '...', totalPages)
      }
    }
    return range
  }

  const prevPage = () => onPageChange(Math.max(page - 1, 1))
  const nextPage = () => onPageChange(Math.min(page + 1, totalPages))

  return (
    <div className={style.pagination}>
      <button onClick={prevPage} disabled={page === 1}>
        Prev
      </button>

      {getPaginationRange().map((p, idx) =>
        p === '...' ? (
          <span key={`dots-${idx}`} className={style.dots}>
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={p === page ? style.activePage : ''}
          >
            {p}
          </button>
        ),
      )}

      <button onClick={nextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  )
}

export default Pagination
