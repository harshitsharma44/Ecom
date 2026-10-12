import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const orderList = orders || [];

  const columns = [
    {
      field: "id",
      headerName: "Order reference",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => (
        <span title={params.value}>#{String(params.value).slice(-8)}</span>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      minWidth: 125,
      flex: 0.6,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items",
      type: "number",
      minWidth: 90,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      minWidth: 135,
      flex: 0.6,
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 90,
      flex: 0.35,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

    orderList.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(item.totalPrice || 0),
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <header className="myOrdersHeader">
            <div>
              <p className="myOrdersEyebrow">Your account</p>
              <Typography id="myOrdersHeading" component="h1">
                Your orders
              </Typography>
              <p className="myOrdersDescription">
                Review purchases and open an order to see its delivery details.
              </p>
            </div>
            <span className="myOrdersCount">
              {orderList.length} {orderList.length === 1 ? "order" : "orders"}
            </span>
          </header>

          <section className="myOrdersTableFrame" aria-label="Order history">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={[8, 10, 20]}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
              rowHeight={58}
            />
          </section>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
