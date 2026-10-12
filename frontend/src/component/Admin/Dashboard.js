import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { FaBoxOpen, FaChartLine, FaClipboardList, FaUsers } from "react-icons/fa";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  const productList = products || [];
  const orderList = orders || [];
  const userList = users || [];
  const outOfStock = productList.filter((item) => item.Stock === 0).length;

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const totalAmount = orderList.reduce(
    (total, item) => total + Number(item.totalPrice || 0),
    0
  );
  const recentOrders = [...orderList].slice(0, 7).reverse();

  const lineState = {
    labels: recentOrders.map((order, index) =>
      order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })
        : `Order ${index + 1}`
    ),
    datasets: [
      {
        label: "Order total",
        data: recentOrders.map((order) => Number(order.totalPrice || 0)),
        borderColor: "#0c7c86",
        backgroundColor: "rgba(12, 124, 134, 0.12)",
        pointBackgroundColor: "#0c7c86",
        pointBorderColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.35,
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of stock", "In stock"],
    datasets: [
      {
        backgroundColor: ["#d68567", "#0c7c86"],
        hoverBackgroundColor: ["#bd6c50", "#07545b"],
        borderWidth: 0,
        data: [outOfStock, Math.max(productList.length - outOfStock, 0)],
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#718087" } },
      y: {
        beginAtZero: true,
        grid: { color: "#e8edef" },
        ticks: { color: "#718087" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, padding: 20, color: "#526168" },
      },
    },
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <header className="dashboardHeader">
          <div>
            <p className="dashboardEyebrow">Store overview</p>
            <h1>Dashboard</h1>
            <p className="dashboardSubheading">
              Keep an eye on sales, orders, and your growing catalog.
            </p>
          </div>
          <Link className="dashboardPrimaryAction" to="/admin/product">
            Add a product
          </Link>
        </header>

        <section className="dashboardSummary" aria-label="Store metrics">
          <article className="dashboardMetric dashboardMetric--revenue">
            <span className="dashboardMetric__icon"><FaChartLine aria-hidden="true" /></span>
            <p>Total revenue</p>
            <strong>{formatCurrency(totalAmount)}</strong>
            <span className="dashboardMetric__note">Across all orders</span>
          </article>
          <Link className="dashboardMetric" to="/admin/orders">
            <span className="dashboardMetric__icon"><FaClipboardList aria-hidden="true" /></span>
            <p>Orders</p>
            <strong>{orderList.length}</strong>
            <span className="dashboardMetric__note">View order activity</span>
          </Link>
          <Link className="dashboardMetric" to="/admin/products">
            <span className="dashboardMetric__icon"><FaBoxOpen aria-hidden="true" /></span>
            <p>Products</p>
            <strong>{productList.length}</strong>
            <span className="dashboardMetric__note">{outOfStock} out of stock</span>
          </Link>
          <Link className="dashboardMetric" to="/admin/users">
            <span className="dashboardMetric__icon"><FaUsers aria-hidden="true" /></span>
            <p>Customers</p>
            <strong>{userList.length}</strong>
            <span className="dashboardMetric__note">View customer list</span>
          </Link>
        </section>

        <section className="dashboardCharts" aria-label="Store analytics">
          <article className="dashboardPanel dashboardPanel--revenue">
            <div className="dashboardPanel__heading">
              <div>
                <p>Recent activity</p>
                <h2>Order revenue</h2>
              </div>
              <span>Last {recentOrders.length} orders</span>
            </div>
            <div className="lineChart">
              {recentOrders.length ? (
                <Line data={lineState} options={lineOptions} />
              ) : (
                <p className="dashboardEmpty">Order revenue will appear here.</p>
              )}
            </div>
          </article>

          <article className="dashboardPanel dashboardPanel--inventory">
            <div className="dashboardPanel__heading">
              <div>
                <p>Catalog health</p>
                <h2>Inventory</h2>
              </div>
            </div>
            <div className="doughnutChart">
              {productList.length ? (
                <Doughnut data={doughnutState} options={doughnutOptions} />
              ) : (
                <p className="dashboardEmpty">Add products to see stock levels.</p>
              )}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
