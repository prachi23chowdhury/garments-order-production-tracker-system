import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAuth from '../../../hooks/UseAuth';  
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?userEmail=${user.email}`);
            return res.data;
        }
    })

    const handleParcelDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your order request has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

const handlePayment = async (order) => {
        const orderInfo = {
            cost: order.total,
        orderId: order._id,
        senderEmail: order.userEmail,
        orderName: order.product_name,
        trackingId: order._id
        }
        const res = await axiosSecure.post('/payment-checkout-session', orderInfo);

        // console.log(res.data.url);
        window.location.assign(res.data.url);
    }


    return (
        <div>
            <h2>All of my orders: {orders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order.product_name}</td>
                                <td>{order.total}</td>
                                 <td>
                                    <button onClick={() => handlePayment(order)} className="btn btn-sm text-green-400 text-black">Paid</button>

                                    
                                </td>
                                <td>
                                    <Link to={`/order-track/${order._id}`}>{order._id}</Link>
                                </td>
                                <td>{order.status}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary'><FaMagnifyingGlass /></button>
                                    <button className='btn btn-square hover:bg-primary mx-2'><FiEdit /></button>
                                    <button onClick={() => handleParcelDelete(order._id)} className='btn btn-square hover:bg-primary'><FaTrashCan /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
