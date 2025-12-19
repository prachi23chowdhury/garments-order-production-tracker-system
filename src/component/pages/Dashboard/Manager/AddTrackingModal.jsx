import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const STATUS_OPTIONS = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

export default function AddTrackingModal({ orderId, onClose, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trackingData = {
      status,
      location,
      note,
      date: new Date(),
    };

    await axiosSecure.post(`/orders/${orderId}/tracking`, trackingData);
    Swal.fire("Success", "Tracking info added", "success");
    refetch();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded">
        <h3 className="text-xl font-bold mb-4">Add Tracking Info</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            className="border w-full p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Location"
            className="border w-full p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <textarea
            placeholder="Note"
            className="border w-full p-2 rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
