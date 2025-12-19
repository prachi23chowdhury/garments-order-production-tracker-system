import React from "react";
import logo from "../../public/assest/thread.jpg";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../hooks/UseAuth";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">

      {/* LEFT */}
      <div className="navbar-start flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-14 w-14 rounded-full" />
        <Link to="/" className="text-3xl font-bold">
          StitchSync
        </Link>
      </div>

      {/* CENTER (DESKTOP) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 text-lg font-semibold">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/all-products" className="hover:text-blue-500">All Products</Link></li>
          <li><Link to="/manager-application" className="hover:text-blue-500">Manager Application</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About Us</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
          {user && (
            <li><Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link></li>
          )}
        </ul>
      </div>

      {/* RIGHT (DESKTOP) */}
      <div className="navbar-end hidden lg:flex">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user?.photoURL || "https://i.ibb.co/2FsfXqM/user.png"}
                  alt="profile"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
              </li>
              <li>
                <button onClick={handleLogOut} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <NavLink to="/login" className="btn btn-sm btn-outline">Login</NavLink>
            <NavLink to="/register" className="btn btn-sm btn-primary">Register</NavLink>
          </div>
        )}
      </div>

      {/* MOBILE MENU */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            ☰
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/all-products">All Products</Link></li>
            <li><Link to="/manager-application">Manager Application</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {user && (
              <>
                <li><Link to="/dashboard/profile">My Profile</Link></li>
                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
