import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function OrderDetailsPage({ id, onClose }) {
  const axiosSecure = useAxiosSecure();

  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["order", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded w-96 text-center">
          Loading order details...
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded shadow-lg p-6 relative">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        <div className="space-y-2 text-sm">
          <p><b>Order ID:</b> {order._id}</p>
          <p><b>User:</b> {order.userEmail || order.firstName}</p>
          <p><b>Product:</b> {order.product_name}</p>
          <p><b>Quantity:</b> {order.quantity}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Order Date:</b> {new Date(order.createdAt).toLocaleString()}</p>

          {order.approvedAt && (
            <p className="text-green-600">
              <b>Approved At:</b>{" "}
              {new Date(order.approvedAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
