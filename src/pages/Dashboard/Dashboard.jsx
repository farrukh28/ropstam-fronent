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
import CreateCar from "../../components/CreateCar/CreateCar";
import RenderCar from "../../components/RenderCar/RenderCar";
import SortCell from "../../components/SortCell/SortCell";
import Spinner from "../../components/Spinner/Spinner";
import { useCarsData } from "../../services/cars";
import { parseSortObjectToString } from "../../utils/helper-functions";
import { useDisclosure } from "../../utils/hooks";

const Dashboard = () => {
  // state
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState({});
  const [sortString, setSortString] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // queries
  const { isPending, error, data, refetch } = useCarsData(
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
        Cars ({data.totalCount})
      </h1>
      <div className="flex justify-end gap-3 mb-6 xs:flex-col sm:flex-row">
        <TextField onChange={handleSearch} size="small" placeholder="Search" />
        <Button
          onClick={onToggle}
          variant="outlined"
          disableElevation
          startIcon={<Add />}
        >
          Create car
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead className="bg-slate-200">
            <TableRow>
              <SortCell
                sortKey="make"
                title="Make"
                sortQuery={sort}
                setSortQuery={setSort}
              />
              <SortCell
                sortKey="model"
                title="Model"
                sortQuery={sort}
                setSortQuery={setSort}
              />
              <SortCell
                sortKey="color"
                title="Color"
                sortQuery={sort}
                setSortQuery={setSort}
              />
              <SortCell
                sortKey="registrationNumber"
                title="Reg. Number"
                sortQuery={sort}
                setSortQuery={setSort}
              />
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((car) => (
              <RenderCar
                key={car._id}
                carID={car._id}
                make={car.make}
                model={car.model}
                color={car.color}
                registrationNumber={car.registrationNumber}
                categoryTitle={car.category.title}
                categoryID={car.category._id}
                refetch={refetch}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              colSpan={6}
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
        <CreateCar open={isOpen} toggle={onToggle} refetch={refetch} />
      )}
    </div>
  );
};

export default Dashboard;
