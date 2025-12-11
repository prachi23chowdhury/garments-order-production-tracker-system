import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import useAuth from "../hooks/UseAuth";
import BookingModal from "./BookingModal";

const ProductsDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleOrder = () => {
  if (!user) {
    navigate("/login", { state: { from: location.pathname } });
    return;
  }
  setOpenModal(true);
};


  if (loading) return <p className="text-center py-10">Loading product details...</p>;
  if (error) return <p className="text-center text-red-600 py-10">Error: {error}</p>;
  if (!product) return <p className="text-center py-10">No Product Found</p>;

  // your JSON fields
  const {
    product_image,
    product_name,
    product_description,
    category,
    price,
    available_quantity,
    minOrder,
    paymentOptions
  } = product;

  return (
    <div className="px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* LEFT — IMAGE */}
      {product_image ? (
        <img
          src={product_image}
          alt={product_name}
          className="w-full h-96 object-cover rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
          No Image Available
        </div>
      )}

      {/* RIGHT — DETAILS */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{product_name}</h2>

        <p className="text-gray-700">{product_description}</p>

        <p><strong>Category:</strong> {category}</p>

        <p className="text-2xl font-bold text-purple-600">
          Price: ৳{price}
        </p>

        <p><strong>Available Quantity:</strong> {available_quantity}</p>

      <p><strong>Minimum Order:</strong> {minOrder || 15} piece </p>


        <p>
  <strong>Payment Options:</strong> Cash on Delivery, bKash, Nagad
</p>


        {user?.role !== "manager" && (
          <button
            onClick={handleOrder}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow"
          >
            Order / Book Now
          </button>
        )}
      </div>
      <BookingModal
   open={openModal}
   onClose={() => setOpenModal(false)}
   user={user}
   product={product}
/>

    </div>
  );
};

export default ProductsDetails;
