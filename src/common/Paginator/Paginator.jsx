import React, { useState } from 'react';
import c from './Paginator.module.css';

function Paginator({ totalItemsCount, pageSize, currentPage, onPageClick, portionSize = 10 }) {

  let pagesCount = totalItemsCount / pageSize

  let pages = [];
  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionSizeNumber = (portionNumber - 1) * portionSize + 1
  let rightPortionSizeNumber = portionNumber * portionSize


  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  return (
    <div className={c.paginator_wrap}>
      <div className={c.paginator}>

        {portionNumber > 1 && <button className={c.page_prev} onClick={() => setPortionNumber(portionNumber - 1)}>Назад</button>}
        {
          pages
            .filter(page => page >= leftPortionSizeNumber && page <= rightPortionSizeNumber)
            .map(page =>
              <button key={page} className={page === currentPage ? c.selectedPage : c.page}
                onClick={() => { onPageClick(page) }}> {page} </button>
            )
        }
        {portionCount > portionNumber && <button className={c.page_next} onClick={() => setPortionNumber(portionNumber + 1)}>Вперед</button>}

      </div>
    </div>
  )
}

export default Paginator
