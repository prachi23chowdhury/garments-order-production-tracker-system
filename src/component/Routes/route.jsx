import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import RootLayout from "../RootLayout/RootLayout";
import AuthLayout from "../../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllProducts from "../pages/AllProducts";
import ProductsDetails from "../ProductsDetails";
import BookingModal from "../BookingModal";
import PrivateRoute from "../Routes/PrivateRoute"
import DashboardLayout from "../../layout/DashboardLayout";
import MyOrders from "../pages/Dashboard/MyOrders";
import ManagerRoute from "./ManageRoute";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ContactUs from "../ContactUs";
import AboutUs from "../AboutUs";
import Manager from "../pages/Dashboard/Manager/Manager";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
          path: "all-products",
          Component: AllProducts
        },
        {
          path: "all-products/:id",
          Component: ProductsDetails
        },
        {
          path: "orders/:id",
          Component: BookingModal
        },
        {
          path: "contact",
          Component: ContactUs
        },
        {
          path: "about",
          Component: AboutUs
        },
        {
          path: "manager-application",
          Component: Manager
        }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
        {
            path: "login",
            Component: Login
        },
        {
            path: "register",
            Component: Register
        }
    ]
  },
  {
    path:"dashboard",
   element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
   children:[
    {
      path: 'my-orders',
      Component: MyOrders
    },
    // {
    //   path: "add-product",
    //   element:<ManagerRoute><AddProduct></AddProduct></ManagerRoute>
    // }
    {
      path: "payment/:id",
      Component: Payment

    },
    {
      path:"payment-history",
      Component: PaymentHistory
    },
    {
      path: "payment-success",
      Component: PaymentSuccess

    }
   ]
  },
  


]);