import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import TrackingTimeline from "./TrackingTimelin";
import AddTrackingModal from "./AddTrackingModal";

export default function ApprovedOrders() {
  const axiosSecure = useAxiosSecure();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders?status=Approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading approved orders...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Orders</h2>

      {orders.length === 0 && (
        <p className="text-center text-gray-500">No approved orders found</p>
      )}

      {orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Approved Date</th>
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
                  <td className="border px-4 py-2">{order.product_name}</td>
                  <td className="border px-4 py-2">{order.quantity}</td>
                  <td className="border px-4 py-2">
                    {order.approvedAt
                      ? new Date(order.approvedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2 space-x-1">
                    <button
                      onClick={() => setSelectedOrderId(order._id)}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Add Tracking
                    </button>
                    <button
                      onClick={() => setTrackingOrderId(order._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      View Tracking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Tracking Modal */}
      {selectedOrderId && (
        <AddTrackingModal
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
          refetch={refetch}
        />
      )}

      {/* Tracking Timeline */}
      {trackingOrderId && (
        <TrackingTimeline
          orderId={trackingOrderId}
          onClose={() => setTrackingOrderId(null)}
        />
      )}
    </div>
  );
}
