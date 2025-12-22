import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/UseAuth';
import Loading from '../Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} =useAuth();
    const location = useLocation();
    
    if(loading){
        return <div>
           <Loading></Loading>

        </div>
    }
    if(!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;


   