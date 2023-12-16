import { Add } from "@mui/icons-material";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import CreateCategory from "../../components/CreateCategory/CreateCategory";
import Spinner from "../../components/Spinner/Spinner";
import { useCategoriesData } from "../../services/categories";
import { useDisclosure } from "../../utils/hooks";
import RenderCategory from "../../components/RenderCategory/RenderCategory";
import SortCell from "../../components/SortCell/SortCell";
import { parseSortObjectToString } from "../../utils/helper-functions";

const Categories = () => {
  // state
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({});
  const [sortString, setSortString] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // queries
  const { isPending, error, data, refetch } = useCategoriesData(
    page,
    limit,
    sortString,
    searchQuery
  );

  // hooks
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const str = parseSortObjectToString(sort);
    setSortString(str);
  }, [sort]);

  const handleSearch = debounce((e) => {
    setSearchQuery(e.target.value);
  }, 500);

  const handleChangeLimit = (e) => {
    setPage(0);
    setLimit(e.target.value);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-center">
        Categories ({data.totalCount})
      </h1>
      <div className="flex justify-end gap-3 mb-6 xs:flex-col sm:flex-row">
        <TextField onChange={handleSearch} size="small" placeholder="Search" />
        <Button
          onClick={onToggle}
          variant="outlined"
          disableElevation
          startIcon={<Add />}
        >
          Create category
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead className="bg-slate-200">
            <TableRow>
              <SortCell
                sortQuery={sort}
                setSortQuery={setSort}
                sortKey="title"
                title="Title"
              />
              <SortCell
                sortQuery={sort}
                setSortQuery={setSort}
                sortKey="createdAt"
                title="Created At"
              />
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((category) => (
              <RenderCategory
                key={category._id}
                categoryID={category._id}
                createdAt={category.createdAt}
                title={category.title}
                refetch={refetch}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              colSpan={3}
              count={data.totalCount}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[3, 10, 25, 50, 100]}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeLimit}
            />
          </TableFooter>
        </Table>
      </TableContainer>

      {isOpen && (
        <CreateCategory open={isOpen} toggle={onToggle} refetch={refetch} />
      )}
    </div>
  );
};

export default Categories;
