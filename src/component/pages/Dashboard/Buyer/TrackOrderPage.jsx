import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function TrackOrderPage() {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: tracking = [], isLoading } = useQuery({
    queryKey: ["order-tracking", orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}/tracking`);
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!tracking.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        Your order has been placed. Tracking will appear once processing starts.
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Track Order</h1>

      <div className="relative border-l-2 border-gray-300 ml-4">
        {tracking.map((step, index) => {
          const isLatest = index === tracking.length - 1;
          return (
            <div key={index} className="mb-8 ml-6 relative">
              <span
                className={`absolute -left-5 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  isLatest ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                {index + 1}
              </span>

              <div className="pl-4">
                <h3
                  className={`text-lg font-semibold ${
                    isLatest ? "text-green-600" : ""
                  }`}
                >
                  {step.status}
                </h3>
                <p className="text-gray-600 text-sm">
                  {new Date(step.date).toLocaleString()}
                </p>
                {step.location && (
                  <p className="text-gray-500 text-sm">
                    Location: {step.location}
                  </p>
                )}
                {step.note && (
                  <p className="text-gray-500 text-sm">Note: {step.note}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}