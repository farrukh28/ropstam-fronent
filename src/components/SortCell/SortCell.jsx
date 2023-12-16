import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { IconButton, TableCell } from "@mui/material";
import React from "react";

const SortCell = ({ sortKey, sortQuery, title, setSortQuery }) => {
  const handleSort = () => {
    const newSortObj = {};
    if (sortQuery[sortKey] === "asc") {
      newSortObj[sortKey] = "desc";
    } else if (sortQuery[sortKey] === "desc") {
      newSortObj[sortKey] = "asc";
    } else if (!sortQuery[sortKey]) {
      newSortObj[sortKey] = "asc";
    }
    setSortQuery(newSortObj);
  };

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        {title}
        <IconButton size="small" onClick={handleSort}>
          {!sortQuery[sortKey] && <ArrowUpward fontSize="small" />}
          {sortQuery[sortKey] === "asc" && (
            <ArrowUpward fontSize="small" color="primary" />
          )}
          {sortQuery[sortKey] === "desc" && (
            <ArrowDownward fontSize="small" color="primary" />
          )}
        </IconButton>
      </div>
    </TableCell>
  );
};

export default SortCell;
