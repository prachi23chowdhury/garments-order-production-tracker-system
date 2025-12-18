import React from 'react';
import useRole from '../../hooks/UseRole';
import Loading from '../Loading';
import Forbidden from '../Forbidden';
import useAuth from '../../hooks/UseAuth';

const AdminRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoute;