import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import AddFoodDialog from "../Components/AddFoodDialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Baseurl } from "../BaseUrl";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import { IndianRupeeIcon } from "lucide-react";

const tableHeadCells = ["Image", "Title", "Description", "Price", "Action"];

const FoodItemsPage = () => {
  const [openAddFoodDialog, setOpenAddFoodDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchFoodItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/food`, {
      headers: {
        Authorization: `Bearer ${Baseurl.token}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["foodItemsData"],
    queryFn: fetchFoodItems,
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.foodItems?.length - page * rowsPerPage);

  const handleCreateFood = (foddData) => {
    console.log(foddData);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 sm:text-32size">
          All recepies
        </h1>
        <button
          type="button"
          onClick={() => setOpenAddFoodDialog(true)}
          className="flex items-center justify-center gap-x-2 rounded-md bg-indigo-700 px-3.5 py-2.5 text-14size font-semibold tracking-wide text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add new recepie
          <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data.foodItems.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadCells.map((cell, index) => (
                    <TableCell
                      key={index}
                      align={index !== 4 ? "left" : "center"}
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.foodItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <img
                          src={row.imageUrl}
                          alt="cover-img"
                          className="h-12 w-12 rounded-md"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <span className="block truncate">
                          {row.title}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="block max-w-20 break words sm:max-w-60">
                          {row.discription}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center gap-1 font-semibold">
                        <IndianRupeeIcon size={15}/>{row.price}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex items-center justify-center gap-2">
                          <button>
                            <PencilSquareIcon className="h-5 w-5 text-green-500" />
                          </button>
                          <button>
                            <TrashIcon className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.foodItems.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <div>No data found</div>
        )}
      </div>
      {openAddFoodDialog && (
        <AddFoodDialog
          openDialog={openAddFoodDialog}
          setterFun={setOpenAddFoodDialog}
          handler={handleCreateFood}
        />
      )}
    </div>
  );
};

export default FoodItemsPage;
