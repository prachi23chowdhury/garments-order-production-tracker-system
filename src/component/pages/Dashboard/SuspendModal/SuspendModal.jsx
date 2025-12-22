import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function SuspendModal({ open, onClose, user, refetch }) {
  const axiosSecure = useAxiosSecure();
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [role, setRole] = useState(user?.role || "buyer"); 

  useEffect(() => {
    if (user) setRole(user.role);
  }, [user]);

  if (!open || !user) return null;

  const handleSubmit = async () => {
    if (!reason || !feedback) {
      Swal.fire("Error", "Both reason & feedback are required", "error");
      return;
    }

    try {
    
      await axiosSecure.patch(`/users/${user._id}/suspend`, {
        reason,
        feedback,
        role,
      });

      Swal.fire("Success", `${role} suspended successfully`, "success");
      setReason("");
      setFeedback("");
      onClose();
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to suspend user", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Suspend {role}</h2>

        <div className="flex flex-col mb-3">
          <label className="font-medium mb-1">Admin Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border rounded px-3 py-2"
            placeholder="Internal reason"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="font-medium mb-1">User Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="border rounded px-3 py-2 h-24 resize-none"
            placeholder="Feedback shown to user"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 text-white rounded">
            Suspend
          </button>
        </div>
      </div>
    </div>
  );
}
