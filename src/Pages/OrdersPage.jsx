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
import {
  PencilSquareIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { Baseurl } from "../BaseUrl";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import { IndianRupeeIcon } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const tableHeadCells = [
  "Images",
  "Order_id",
  "Rating",
  "Amount",
  "Status",
  "Action",
];

const OrdersPage = () => {
  const [openAddFoodDialog, setOpenAddFoodDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchAllOrders = async () => {
    return await fetch(`${Baseurl.baseurl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${Baseurl.token}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["ordersData"],
    queryFn: fetchAllOrders,
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
    Math.min(rowsPerPage, data?.orders?.length - page * rowsPerPage);

  const handleCreateFood = (foddData) => {
    console.log(foddData);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <h1 className="text-26size font-bold tracking-wide text-gray-700 sm:text-32size">
          All orders
        </h1>
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : data.orders.length > 0 ? (
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
                {data.orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <AvatarGroup max={3} className="flex w-max justify-end">
                          {row.orderItems.map((item, i) => (
                            <Avatar alt="cover-img" src={item.imageUrl} />
                          ))}
                        </AvatarGroup>
                      </TableCell>
                      <TableCell align="left">
                        <span className="block truncate text-indigo-500">
                          {row.paymentInfo.orderId}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center gap-1 text-14size">
                          {row.ratingArr[0]?.value || 0}
                          <StarIcon className="h-5 w-5 text-yellow-400" />
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center gap-1 font-semibold">
                          <IndianRupeeIcon size={15} />
                          {row.totalAmount}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <span className="flex items-center justify-center gap-1 font-semibold">
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex items-center justify-center gap-2">
                          <button>
                            <PencilSquareIcon className="h-5 w-5 text-green-500" />
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
              count={data.orders.length}
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

export default OrdersPage;
