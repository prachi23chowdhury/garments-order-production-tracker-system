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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentHistory from "../pages/Dashboard/Payment/PaymentHistory";
import ContactUs from "../ContactUs";
import Manager from "../pages/Dashboard/Manager/Manager";
import ApproveManager from "../pages/Dashboard/ApproveManager/ApproveManager";
import UsersManagement from "../pages/Dashboard/UserManagment/UsersManagement";
import AdminRoute from "./AdminRoute";
import AdminAllProducts from "../pages/Dashboard/AdminAllProducts/AdminAllProducts";
import AdminAllOrders from "../pages/Dashboard/AdminAllProducts/AdminAllOrders";
import OrderDetails from "../pages/Dashboard/AdminAllProducts/OrderDetails";
import ManagerRoute from "./ManagerRoute";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import ManageProduct from "../pages/Dashboard/Manager/ManageProduct";
import PendingOrders from "../pages/Dashboard/Manager/PendingOrders";
import ApprovedOrders from "../pages/Dashboard/Manager/ApproveOrders";

import TrackOrderPage from "../pages/Dashboard/Buyer/TrackOrderPage";
import UpdateProduct from "../pages/Dashboard/Manager/UpdateProduct";
import MyProfile from "../pages/Dashboard/MyProfile";






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
    {
      path: "add-product",
      element:<ManagerRoute><AddProduct></AddProduct></ManagerRoute>
    },
    {
      path: "manage-product",
      element:<ManagerRoute><ManageProduct/></ManagerRoute>
    },
    {
      path: "pending-orders",
      element:<ManagerRoute><PendingOrders/></ManagerRoute>
    },
     {
      path: "approve-orders",
      element:<ManagerRoute><ApprovedOrders/></ManagerRoute>
    },
    {
      path: "update-product/:id",
      element: <ManagerRoute><UpdateProduct /></ManagerRoute>
    },
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

    },
     {
      path: "approve-manager",
    element: <AdminRoute><ApproveManager/></AdminRoute>

    },
     {
      path: "users-management",
     element: <AdminRoute><UsersManagement/></AdminRoute>
    },
    {
      path:"admin-all-products",
    element:<AdminRoute><AdminAllProducts/></AdminRoute>

    },
   {
      path: "admin-all-orders",
      element: <AdminRoute><AdminAllOrders /></AdminRoute>,
      children: [
        {
          path: "order/:id",
          element: <OrderDetails />
        }
      ]
    },
    {
      path: 'tracking-order/:orderId',
     element:<TrackOrderPage/>
    },
    {
      path: 'my-profile',
      Component: MyProfile
    },
   ]
  },
  


]);