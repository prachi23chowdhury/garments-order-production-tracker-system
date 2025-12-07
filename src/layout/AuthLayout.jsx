import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';

const AuthLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;