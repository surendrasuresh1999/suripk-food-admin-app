import { PlusCircleIcon } from "@heroicons/react/20/solid";
import React, { useContext, useState } from "react";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import { IndianRupeeIcon } from "lucide-react";
import swal from "sweetalert";
import axios from "axios";
import toast from "react-hot-toast";
import NodataFound from "../Common/NodataFound";
import Context from "../Context/Context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const tableHeadCells = [
  "Image",
  "Title",
  "Description",
  "Rating",
  "Price",
  "Action",
];

const FoodItemsPage = () => {
  const jwtToken = Cookies.get("adminJwtToken");
  const [openAddFoodDialog, setOpenAddFoodDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { defaultMode, setEditableObj, editableObj } = useContext(Context);

  const fetchFoodItems = async () => {
    return await fetch(`${Baseurl.baseurl}/api/food/admin`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
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
    rowsPerPage -
    Math.min(rowsPerPage, data?.foodItems?.length - page * rowsPerPage);

  const handleCreateFood = (foddData, actions, actionType) => {
    const httpMethod = actionType === "new" ? "POST" : "PUT";
    const urlString =
      actionType === "new" ? "food" : `food/${editableObj?._id}`;

    axios({
      method: httpMethod,
      url: `${Baseurl.baseurl}/api/${urlString}`,
      data: foddData,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("foodItemsData");
          setOpenAddFoodDialog(false);
          actions.resetForm();
          setEditableObj({});
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handleDeleteFood = (foodId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: `${defaultMode ? "dark-swal" : "white-swal"}`,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${Baseurl.baseurl}/api/food/${foodId}`, {
            headers: {
              Authorization: `Bearer ${Baseurl.token}`,
            },
          })
          .then((res) => {
            if (res.data.status) {
              swal("Poof! Your food item has been deleted successfully!", {
                icon: "success",
              });
              queryClient.invalidateQueries("foodItemsData");
            } else {
              swal("Oops! Something went wrong while deleting.", {
                icon: "error",
              });
            }
          })
          .catch((error) => {
            swal("Oops! Something went wrong while deleting.", {
              icon: "error",
            });
            console.error("Error:", error);
          });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 dark:text-white sm:text-32size">
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
        ) : data && data.status === 401 ? (
          navigate("/login")
        ) : data.foodItems.length > 0 ? (
          <TableContainer
            component={Paper}
            className="bg-white dark:bg-gray-800"
          >
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadCells.map((cell, index) => (
                    <TableCell
                      key={index}
                      align={index !== 4 ? "left" : "center"}
                      sx={{ fontWeight: "bold", fontSize: "16px" }}
                      className="text-black dark:text-white"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.foodItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        <img
                          src={row.imageUrl}
                          alt="cover-img"
                          className="h-12 w-12 rounded-md"
                        />
                      </TableCell>
                      <TableCell align="left">
                        <span className="block truncate text-black dark:text-white">
                          {row.title}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="block max-w-20 break-words text-black dark:text-white sm:max-w-60">
                          {row.discription}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center justify-center gap-1 font-semibold text-black dark:text-white">
                          {row.rating || 0}🌟
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center gap-1 font-semibold text-black dark:text-white">
                          <IndianRupeeIcon size={15} />
                          {row.price}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setOpenAddFoodDialog(true);
                              setEditableObj(row);
                            }}
                          >
                            <PencilSquareIcon className="h-5 w-5 text-green-500" />
                          </button>
                          <button onClick={() => handleDeleteFood(row._id)}>
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 50 * emptyRows }}>
                    <TableCell colSpan={tableHeadCells.length} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              sx={{ display: "flex", justifyContent: "start" }}
              count={data.foodItems.length}
              rowsPerPage={rowsPerPage}
              className="text-black dark:text-white"
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        ) : (
          <NodataFound subTitle={"No fodd items data found!"} />
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
