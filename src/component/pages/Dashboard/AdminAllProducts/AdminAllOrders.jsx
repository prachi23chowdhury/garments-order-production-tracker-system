import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import OrderDetails from "./OrderDetails";
import Swal from "sweetalert2";

const AdminAllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allOrders", statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/orders${statusFilter ? `?status=${statusFilter}` : ""}`
      );
      return res.data;
    },
  });

  // 🔥 status update handler
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
      Swal.fire("Updated!", "Order status updated", "success");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Status:</label>
        <select
          className="border px-3 py-1 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && <p className="text-center">Loading orders...</p>}

      {/* Empty */}
      {!isLoading && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found</p>
      )}

      {/* Table */}
      {!isLoading && orders.length > 0 && (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Qty</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="border px-4 py-2">{order._id}</td>
                <td className="border px-4 py-2">{order.firstName}</td>
                <td className="border px-4 py-2">{order.product_name}</td>
                <td className="border px-4 py-2">{order.quantity}</td>

                {/* Status badge */}
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
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

                {/* 🔥 Action buttons */}
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
      )}

      {/* Modal */}
      {selectedOrderId && (
        <OrderDetails
          id={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
};

export default AdminAllOrders;
