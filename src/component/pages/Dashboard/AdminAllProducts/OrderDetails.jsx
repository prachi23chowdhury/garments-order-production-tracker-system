import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const OrderDetails = ({ id, onClose }) => {
  const axiosSecure = useAxiosSecure();

  const { data: order, isLoading } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (!order) return <p>No order found</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>User Email:</strong> {order.userEmail}</p>
        <p><strong>Product:</strong> {order.product_name}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price:</strong> {order.price}</p>
        <p><strong>Total:</strong> {order.total}</p>
        <p><strong>Contact:</strong> {order.contact}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Notes:</strong> {order.notes}</p>
        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
