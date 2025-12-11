import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import RootLayout from "../RootLayout/RootLayout";
import AuthLayout from "../../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllProducts from "../pages/AllProducts";
import ProductsDetails from "../ProductsDetails";
import BookingModal from "../BookingModal";



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
          path: "booking/:id",
          Component: BookingModal
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
  }
]);