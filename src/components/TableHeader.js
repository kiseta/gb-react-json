
// TableHeader.js
// =====================

import React from "react";

function TableHeader({ columnName, columnDisplayName, sortOrder, sortTable }) {
  const handleClick = () => {
    sortTable(columnName);
  };

  let icon = null;
  if (sortOrder.column === columnName) {
    if (sortOrder.direction === "asc") {
      icon = <span>&uarr;</span>;
    } else {
      icon = <span>&darr;</span>;
    }
  }

  return (
    <th onClick={handleClick}>
      {columnDisplayName} {icon}
    </th>
  );
}

export default TableHeader;
