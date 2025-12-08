import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../../hooks/UseAuth';
import { PacmanLoader } from 'react-spinners';

const PrivateRoute = ({children}) => {
    const {user, loading} =useAuth();
    const location = useLocation();
    
    if(loading){
        return <div>
            <PacmanLoader/>

        </div>
    }
    if(!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoute;