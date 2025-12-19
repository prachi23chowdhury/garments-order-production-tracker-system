
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function PendingOrders() {
  const axiosSecure = useAxiosSecure();


  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Approve this order?",
      icon: "question",
      showCancelButton: true,
    });
    if (isConfirmed) {
      await axiosSecure.patch(`/orders/approve/${id}`);
      refetch();
      Swal.fire("Approved!", "", "success");
    }
  };

  const handleReject = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Reject this order?",
      icon: "warning",
      showCancelButton: true,
    });
    if (isConfirmed) {
      await axiosSecure.patch(`/orders/reject/${id}`);
      refetch();
      Swal.fire("Rejected!", "", "error");
    }
  };

  const handleView = (id) => {
    // Redirect or open modal for order details
    window.location.href = `/dashboard/order/${id}`;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Order Date</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-2 border">{order._id}</td>
                <td className="px-4 py-2 border">{order.userEmail}</td>
                <td className="px-4 py-2 border">{order.productId}</td>
                <td className="px-4 py-2 border">{order.quantity}</td>
                <td className="px-4 py-2 border">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleApprove(order._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(order._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleView(order._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center px-4 py-2 border text-gray-500"
                >
                  No pending orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
