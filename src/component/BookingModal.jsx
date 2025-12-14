import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

export default function BookingModal({ open, onClose, user, product }) {
  const { price, available_quantity } = product;

  const minQty = 15;

  const [qty, setQty] = useState(minQty);
  const [total, setTotal] = useState(price * minQty);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setQty(minQty);
    setTotal(price * minQty);
  }, [product]);

  const handleQty = (e) => {
    let val = Number(e.target.value);

    if (val < minQty) val = minQty;
    if (val > available_quantity) val = available_quantity;

    setQty(val);
    setTotal(val * price);
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !contact || !address) {
      Swal.fire("Error", "First Name, Last Name, Contact and Address are required", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: "Confirm Booking?",
      text: "Are you sure you want to submit this booking?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
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
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        Swal.fire("Success", "Booking submitted successfully!", "success");
        onClose();
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server connection failed!", "error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-semibold mb-4">Book Product</h2>

        {/* Email */}
        <label className="block mb-1">Email</label>
        <input
          value={user.email}
          readOnly
          className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
        />

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block mb-1">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Product Name */}
        <label className="block mb-1">Product</label>
        <input
          value={product.product_name}
          readOnly
          className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
        />

        {/* Quantity */}
        <label className="block mb-1">Quantity (Minimum 15)</label>
        <input
          type="number"
          value={qty}
          min={minQty}
          max={available_quantity}
          onChange={handleQty}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        {/* Price / Payment Info (Read-only) */}
        <label className="block mb-1">Payment Info</label>
        <div className="w-full border rounded px-3 py-2 mb-3 bg-gray-100 text-sm">
          <p>Price per unit: ৳{price}</p>
          <p>Quantity: {qty}</p>
          <p className="font-semibold">Total: ৳{total}</p>
        </div>

        {/* Contact */}
        <label className="block mb-1">Contact Number</label>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        />

        {/* Address */}
        <label className="block mb-1">Delivery Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-3"
        ></textarea>

        {/* Notes */}
        <label className="block mb-1">Additional Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
        ></textarea>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        <Link to={`/dashboard/payment/${product._id}`}>
        
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </Link>
        </div>

      </div>
    </div>
  );
}
