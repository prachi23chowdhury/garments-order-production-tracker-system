import React from 'react';
import useAuth from '../hooks/useAuth';
import Forbidden from '../components/Forbidden/Forbidden';
import useRole from '../../hooks/UseRole';
import Loading from '../Loading';

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