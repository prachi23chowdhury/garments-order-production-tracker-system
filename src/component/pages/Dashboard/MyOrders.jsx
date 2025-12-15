import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/UseAuth';
import { useState } from 'react';
import { Link } from 'react-router';

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cancelingOrderId, setCancelingOrderId] = useState(null);

    const { data: orders = [], refetch } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        }
    });

    const handleCancel = async (orderId) => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmCancel) return;

        try {
            setCancelingOrderId(orderId);
            await axiosSecure.delete(`/orders/${orderId}`);
            alert("Order canceled successfully!");
            refetch();
        } catch (error) {
            console.error(error);
            alert("Failed to cancel order!");
        } finally {
            setCancelingOrderId(null);
        }
    };

    const handleView = (orderId) => {
        // You can navigate to a details page or open a modal here
        alert(`View details for order ${orderId}`);
    };

    
     

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">My Orders ({orders.length})</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order._id}</td>
                                <td>{order.product_name}</td>
                                <td>{order.quantity}</td>
                                <td><button className="btn btn-sm bg-lime-300 text-black">Paid</button>   
                                </td>
                                <td>
                                    <Link to={`/order-track/${order.trackingId}`}> {order.trackingId}</Link>
                                </td>
                                <td className="flex gap-2">
                                    <button
                                        className="btn btn-sm btn-info"
                                        onClick={() => handleView(order._id)}
                                    >
                                        View
                                    </button>
                                    {order.status === 'Pending' && (
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleCancel(order._id)}
                                            disabled={cancelingOrderId === order._id}
                                        >
                                            {cancelingOrderId === order._id ? 'Canceling...' : 'Cancel'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;
