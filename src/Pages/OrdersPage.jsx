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
import { Baseurl } from "../BaseUrl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Common/Loader";
import ConnectionLost from "../Common/ConnectionLost";
import { IndianRupeeIcon } from "lucide-react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";
import NodataFound from "../Common/NodataFound";

const tableHeadCells = [
  "Images",
  "Order_id",
  "Amount",
  "Address",
  "Status",
  "Action",
];

const orderStatus = [
  "Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
];

const OrdersPage = () => {
  const [openAddFoodDialog, setOpenAddFoodDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const queryClient = useQueryClient();

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

  const handleChangeOrderStatus = (statusText, orderId) => {
    axios
      .put(
        `${Baseurl.baseurl}/api/orders/${orderId}`,
        { statusText },
        {
          headers: {
            Authorization: `Bearer ${Baseurl.token}`,
          },
        },
      )
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("ordersData");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const renderStatusUpdateMenu = (orderId) => {
    return (
      <div className="flex justify-center">
        <Popover>
          <PopoverButton className="w-full rounded-md border border-orange-600 px-2 py-1 text-sm/6 font-semibold text-orange-400 outline-none">
            Update
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel
              anchor="bottom"
              className="popover-shadow divide-y divide-white/5 rounded-md bg-white text-sm/6 [--anchor-gap:var(--spacing-5)]"
            >
              <div className="flex flex-col justify-start gap-2 py-2">
                {orderStatus.map((button, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      handleChangeOrderStatus(button, orderId);
                      close();
                    }}
                    className="px-6 py-1 text-start text-14size font-semibold tracking-wide text-slate-600 hover:bg-gray-200"
                  >
                    {button}
                  </button>
                ))}
              </div>
            </PopoverPanel>
          </Transition>
        </Popover>
      </div>
    );
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
                  .map((row, index) => (
                    <TableRow key={index}>
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
                        <span className="flex items-center gap-1 font-semibold">
                          <IndianRupeeIcon size={15} />
                          {row.totalAmount}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <button className="break words block max-w-20 sm:max-w-60">
                          {/* {row.discription} */}Delivery Address
                        </button>
                      </TableCell>

                      <TableCell align="center">
                        <span
                          className={`inline-block ${row.status === "Pending" ? "text-gray-500" : row.status === "Confirmed" ? "text-indigo-500" : row.status === "Processing" ? "text-slate-700" : row.status === "Out for Delivery" ? "text-orange-400" : "text-green-600"} font-semibold`}
                        >
                          {row.status}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        {renderStatusUpdateMenu(row._id)}
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
          <NodataFound subTitle={"No orders received till now!"} />
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
