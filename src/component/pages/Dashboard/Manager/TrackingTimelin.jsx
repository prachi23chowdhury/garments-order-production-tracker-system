import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


export default function TrackingTimeline({ orderId, onClose }) {
  const axiosSecure = useAxiosSecure();

  const { data: tracking = [], isLoading } = useQuery({
    queryKey: ["tracking", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}/tracking`);
      return res.data;
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Tracking Timeline</h3>

        {isLoading && <p>Loading...</p>}

        {!isLoading && tracking.length === 0 && (
          <p className="text-gray-500">No tracking updates found</p>
        )}

        <ul className="space-y-3 text-sm">
          {tracking.map((item, index) => (
            <li key={index} className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">{item.status}</p>
              <p>{item.location}</p>
              {item.note && <p className="text-gray-600">{item.note}</p>}
              <p className="text-xs text-gray-500">
                {new Date(item.date).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>

        <div className="text-right mt-5">
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
