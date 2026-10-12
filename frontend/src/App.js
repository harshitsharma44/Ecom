import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import WebFont from "webfontloader";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import store from "./store";
import { loadUser } from "./actions/userAction";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["DM Sans:400,500,600,700", "Manrope:500,600,700,800"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey().catch(() => {});
  }, []);

  return (
    <Router>
      <div className="app-shell">
        <Header />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <main className="app-main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
            <ProtectedRoute
              exact
              path="/password/update"
              component={UpdatePassword}
            />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route exact path="/password/reset/:token" component={ResetPassword} />
            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/shipping" component={Shipping} />
            <ProtectedRoute exact path="/success" component={OrderSuccess} />
            <ProtectedRoute exact path="/orders" component={MyOrders} />
            <ProtectedRoute
              exact
              path="/order/confirm"
              component={ConfirmOrder}
            />
            <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
            <ProtectedRoute
              exact
              path="/admin/dashboard"
              isAdmin
              component={Dashboard}
            />
            <ProtectedRoute
              exact
              path="/admin/products"
              isAdmin
              component={ProductList}
            />
            <ProtectedRoute
              exact
              path="/admin/product"
              isAdmin
              component={NewProduct}
            />
            <ProtectedRoute
              exact
              path="/admin/product/:id"
              isAdmin
              component={UpdateProduct}
            />
            <ProtectedRoute
              exact
              path="/admin/orders"
              isAdmin
              component={OrderList}
            />
            <ProtectedRoute
              exact
              path="/admin/order/:id"
              isAdmin
              component={ProcessOrder}
            />
            <ProtectedRoute
              exact
              path="/admin/users"
              isAdmin
              component={UsersList}
            />
            <ProtectedRoute
              exact
              path="/admin/user/:id"
              isAdmin
              component={UpdateUser}
            />
            <ProtectedRoute
              exact
              path="/admin/reviews"
              isAdmin
              component={ProductReviews}
            />
            <Route component={NotFound} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
