import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function BookingModal({ open, onClose, user, product }) {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const minQty = 1000;
  const stepQty = 500;
  const price = Number(product?.price || 0);
  const available_quantity = product?.available_quantity || 0;
  const isSuspended = user?.status === "suspended";

  const [qty, setQty] = useState(minQty);
  const [total, setTotal] = useState(price * minQty);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (product) {
      setQty(minQty);
      setTotal(price * minQty);
    }
  }, [product, price]);

  if (!open || !product || !user) return null;

  const handleQty = (e) => {
    let val = Number(e.target.value);
    if (val < minQty) val = minQty;
    if (val > available_quantity) val = available_quantity;
    val = Math.floor(val / stepQty) * stepQty;
    setQty(val);
    setTotal(val * price);
  };

  const showSuspendedModal = () => {
    Swal.fire({
      title: "Account Suspended",
      icon: "error",
      html: `
        <div style="text-align:left">
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Status:</b> <span style="color:red">Suspended</span></p>
          <hr/>
          <p><b>Reason:</b> ${user.reason || "N/A"}</p>
          <p><b>Feedback:</b> ${user.feedback || "N/A"}</p>
        </div>
      `,
    });
  };

  const handleSubmit = async () => {
    if (isSuspended) {
      showSuspendedModal();
      return;
    }

    if (!firstName || !lastName || !contact || !address) {
      Swal.fire(
        "Error",
        "First Name, Last Name, Contact and Address are required",
        "error"
      );
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
    });

    if (!confirm.isConfirmed) return;

    const bookingData = {
      userEmail: user.email,
      firstName,
      lastName,
      product_name: product.product_name,
      price,
      quantity: qty,
      total,
      contact,
      address,
      notes,
    };

    try {
      const res = await axiosSecure.post("/orders", bookingData);

      if (res.status === 200) {
       
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booking submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        
        onClose();

        
        navigate(`/dashboard/payment/${product._id}`, { state: { quantity: qty, total } });
      }
    } catch (err) {
      Swal.fire("Error", "Server error or unauthorized", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Book Product</h2>

        {isSuspended && (
          <div
            onClick={showSuspendedModal}
            className="mb-4 p-3 rounded bg-red-100 text-red-700 text-sm cursor-pointer"
          >
            Your account is suspended. Click to see details.
          </div>
        )}

        <label>Email</label>
        <input
          value={user.email || ""}
          readOnly
          className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
        />

        <div className="grid grid-cols-2 gap-3 mb-3">
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        <label>Product</label>
        <input
          value={product.product_name || ""}
          readOnly
          className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
        />

        <label>Quantity (Min 1000, Step 500)</label>
        <input
          type="number"
          min={minQty}
          step={stepQty}
          max={available_quantity}
          value={qty}
          onChange={handleQty}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <div className="border rounded px-3 py-2 mb-3 bg-gray-100 text-sm">
          <p>Price per unit: ৳{price}</p>
          <p>Quantity: {qty}</p>
          <p className="font-semibold">Total: {total}</p>
        </div>

        <input
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        <textarea
          placeholder="Additional Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSuspended}
            className={`px-4 py-2 rounded text-white ${
              isSuspended
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
