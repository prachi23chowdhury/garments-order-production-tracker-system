import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Orders per page

  // Fetch paginated orders
  const { data: ordersData = { orders: [], total: 0 }, refetch, isFetching } = useQuery({
    queryKey: ['my-orders', user?.email, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?userEmail=${user.email}&page=${page}&limit=${limit}`);
      return res.data; // { orders: [], total: number }
    },
    keepPreviousData: true,
  });

  const orders = ordersData.orders || [];
  const totalOrders = ordersData.total || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  // Payment handler
  const handlePayment = async (order) => {
    const orderInfo = {
      cost: order.total,
      orderId: order._id,
      senderEmail: order.userEmail,
      orderName: order.product_name,
      trackingId: order._id,
    };

    const res = await axiosSecure.post('/payment-checkout-session', orderInfo);
    window.location.assign(res.data.url);
  };

  // Cancel order handler
  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this cancellation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/orders/${orderId}/status`, { status: 'Cancelled' })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
            }
          })
          .catch(() => {
            Swal.fire('Error!', 'Failed to cancel order.', 'error');
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        All of my orders: {totalOrders}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Tracking</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <th>{(page - 1) * limit + index + 1}</th>
                <td>{order.product_name}</td>
                <td>${order.total}</td>

                <td>
                  <button onClick={() => handlePayment(order)} className="btn btn-sm">
                    Paid
                  </button>
                </td>

                <td>
                  <Link
                    to={`/dashboard/tracking-order/${order._id}`}
                    className="text-blue-600 underline"
                  >
                    {order._id}
                  </Link>
                </td>

                <td>{order.status}</td>

                <td className="flex gap-2">
                  {/* View Button */}
                  <button
                    onClick={() => window.location.assign(`/dashboard/tracking-order/${order._id}`)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <FaMagnifyingGlass />
                  </button>

                  {/* Cancel Button: Only visible if status = Pending */}
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="btn btn-sm btn-error"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-5">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="btn btn-sm"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((old) => Math.min(old + 1, totalPages))}
          disabled={page === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>

      {isFetching && <p className="text-center mt-2">Loading...</p>}
    </div>
  );
};

export default MyOrders;
