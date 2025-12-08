import React from 'react';
import logo from "../../public/assest/thread.jpg";
import { Link, NavLink, useNavigate } from 'react-router';
import useAuth from '../hooks/UseAuth';


const Navbar = () => {
    const {user,  logOut} = useAuth();

    const navigate = useNavigate()

  const handleLogOut = () => {
          logOut()
            .then(() => {
              navigate("/"); 
            })
            .catch(error => console.log(error));
    }
    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            
            {/* LEFT SIDE */}
            <div className="navbar-start flex items-center ">
                <img src={logo} alt="Logo" className="h-20 w-30 rounded-full" />
                <a className="text-3xl font-bold">StitchSync</a>
            </div>

            {/* CENTER lg */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-[16px] font-medium gap-3">
                    <li><Link className='font-bold text-xl text-gray-500  hover:text-blue-500 transition'>Home</Link></li>
                    <li><Link className='font-bold text-xl text-gray-500  hover:text-blue-500 transition'>All-Product</Link></li>
                    <li><Link className='font-bold text-xl text-gray-500  hover:text-blue-500 transition'>About Us</Link></li>
                    <li><Link className='font-bold text-xl text-gray-500  hover:text-blue-500 transition'>Contact</Link></li>
                </ul>
            </div>

            {/* RIGHT SIDE (Login/Register) */}
            <div className="navbar-end hidden lg:flex gap-2">
       
          <div>
            {
                user ? 
                <NavLink onClick={handleLogOut}><span class="box">Logout</span></NavLink>
                :
                <div>
                    <NavLink to="login"><span class="box">Login</span></NavLink> 
                 <NavLink to="register"><span class="box">Register</span></NavLink>
                </div>
            }
          </div>
         
                
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
                        <li><Link to="/" className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>Home</Link></li>
                        <li><Link className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>All-Product</Link></li>
                        <li><Link className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>About Us</Link></li>
                        <li><Link className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>Contact</Link></li>
                        <li><Link className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>Login</Link></li>
                        <li><Link className='font-bold text-lg text-gray-600  hover:text-blue-500 transition'>Register</Link></li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Navbar;
