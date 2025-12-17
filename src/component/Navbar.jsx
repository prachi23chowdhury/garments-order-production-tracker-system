import React from 'react';
import logo from "../../public/assest/thread.jpg";
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../hooks/UseAuth';

const Navbar = () => {
    const {user, logOut} = useAuth();
    const navigate = useNavigate()

    const handleLogOut = () => {
        logOut()
        .then(() => { navigate("/"); })
        .catch(error => console.log(error));
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            
            {/* LEFT */}
            <div className="navbar-start flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-16 w-16 rounded-full" />
                <a className="text-3xl font-bold">StitchSync</a>
            </div>

            {/* CENTER (DESKTOP) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-[16px] font-medium gap-5">
                    <li><Link to="/" className='font-bold text-xl text-gray-500 hover:text-blue-500'>Home</Link></li>
                    <li><Link to="all-products" className='font-bold text-xl text-gray-500 hover:text-blue-500'>All-Product</Link></li>
                    <li><Link to="manager-application" className='font-bold text-xl text-gray-500 hover:text-blue-500'>Manager-Application</Link></li>
                    <li><Link to="about" className='font-bold text-xl text-gray-500 hover:text-blue-500'>About Us</Link></li>
                    <li><Link to="contact" className='font-bold text-xl text-gray-500 hover:text-blue-500'>Contact</Link></li>
                     {
    user && <>
    <li><Link to="/dashboard" className='font-bold text-xl text-gray-500 hover:text-blue-500'>DashBoard</Link></li>
    </>
}
                </ul>
               
            </div>

            {/* RIGHT (DESKTOP) */}
            <div className="navbar-end hidden lg:flex gap-3">
                { user ? (
                    <NavLink onClick={handleLogOut}><span className="box">Logout</span></NavLink>
                ) : (
                    <div className="flex gap-2">
                        <NavLink to="login"><span className="box">Login</span></NavLink> 
                        <NavLink to="register"><span className="box">Register</span></NavLink>
                    </div>
                )}
            </div>

            {/* MOBILE MENU */}
            <div className="navbar-end lg:hidden">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>

                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">

                        <li><Link to="/" className='font-bold text-lg text-gray-600 hover:text-blue-500'>Home</Link></li>
                        <li><Link to="all-products" className='font-bold text-lg text-gray-600 hover:text-blue-500'>All-Product</Link></li>
                        <li><Link to="manager-application" className='font-bold text-lg text-gray-600 hover:text-blue-500'>Manager-Application</Link></li>
                        <li><Link to="about" className='font-bold text-lg text-gray-600 hover:text-blue-500'>About Us</Link></li>
                        <li><Link to="contact" className='font-bold text-lg text-gray-600 hover:text-blue-500'>Contact</Link></li>
                    {
    user && <>
    <li><Link to="/dashboard" className='font-bold text-xl text-gray-500 hover:text-blue-500'>DashBoard</Link></li>
    </>
}
                        {/* MOBILE AUTH CONTROL */}
                        { user ? (
                            <li><button onClick={handleLogOut} className='font-bold text-lg text-red-500'>Logout</button></li>
                        ) : (
                            <>
                                <li><Link to="login" className='font-bold text-lg text-gray-600 hover:text-blue-500'>Login</Link></li>
                                <li><Link to="register" className='font-bold text-lg text-gray-600 hover:text-blue-500'>Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
