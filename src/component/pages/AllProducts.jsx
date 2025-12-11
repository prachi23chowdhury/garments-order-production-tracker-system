import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/UseAuth";

export default function AllProducts({ products: initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // 👉 Correct API (all products)
  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  // 👉 Navigate to details page
  const handleDetails = (id) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    navigate(`/all-products/${id}`);
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center tracking-wide">
        <span className="text-indigo-600">Our</span> Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/80 backdrop-blur-lg border border-gray-200
            shadow-md rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 
            transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-52 rounded-xl overflow-hidden relative group">
              <img
                src={p.product_image}
                alt={p.product_name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <h2 className="text-lg font-bold mt-3">{p.product_name}</h2>
            <p className="text-gray-500 text-sm mb-1">
              Category: {p.category}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-bold text-indigo-600">${p.price}</span>
              <span className="text-sm text-gray-600">Stock: {p.available_quantity}</span>
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => handleDetails(p.id)}
                className="flex-1 py-2 bg-indigo-600 text-white font-medium rounded-lg text-center hover:bg-indigo-700 transition"
              >
                Details
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
