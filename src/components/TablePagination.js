// TablePagination.js
// =====================

import React from "react";

const TablePagination = ({ totalEntries, entriesPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalEntries / entriesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <span>Show:</span>
      <select onChange={(e) => entriesPerPage(parseInt(e.target.value))}>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
      </select>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? "active" : ""}>
            <a onClick={() => paginate(number)} href='#'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TablePagination;
