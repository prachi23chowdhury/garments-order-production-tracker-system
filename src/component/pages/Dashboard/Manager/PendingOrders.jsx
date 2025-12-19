import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import OrderDetailsPage from "./OrderDetailsPage";

export default function PendingOrders() {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders${statusFilter ? `?status=${statusFilter}` : ""}`
      );
      return res.data;
    },
  });

  const updateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: `Change status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/orders/${id}/status`, { status });
      refetch();
      Swal.fire("Updated!", "Order status updated successfully", "success");
    }
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>

      {/* Status Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="font-medium">Filter by Status:</label>
        <select
          className="border px-3 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="">All</option>
        </select>
      </div>

      {/* Empty State */}
      {!isLoading && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found</p>
      )}

      {/* Orders Table */}
      {!isLoading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">
                    {order.userEmail || order.firstName}
                  </td>
                  <td className="border px-4 py-2">
                    {order.product_name || order.productId}
                  </td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Status Badge */}
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-500"
                            : order.status === "Approved"
                            ? "bg-green-600"
                            : "bg-red-500"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="border px-4 py-2 space-x-1">
                    <button
                      onClick={() => updateStatus(order._id, "Approved")}
                      disabled={order.status === "Approved"}
                      className="bg-green-600 disabled:bg-gray-300 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "Rejected")}
                      disabled={order.status === "Rejected"}
                      className="bg-red-500 disabled:bg-gray-300 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => updateStatus(order._id, "Pending")}
                      disabled={order.status === "Pending"}
                      className="bg-yellow-500 disabled:bg-gray-300 text-white px-2 py-1 rounded"
                    >
                      Pending
                    </button>

                    <button
                      onClick={() => setSelectedOrderId(order._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrderId && (
        <OrderDetailsPage
          id={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
