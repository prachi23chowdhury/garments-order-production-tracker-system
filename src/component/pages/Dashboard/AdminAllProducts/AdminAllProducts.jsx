import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UpdateProductModal from "./UpdateProductModal";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Sync query data with local state
  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  // Delete Product
  const handleDelete = async (product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to permanently delete "${product.product_name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/products/${product._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    } catch (err) {
      Swal.fire("Error!", "Failed to delete product.", "error");
    }
  };

  // Toggle Show on Home
  const handleToggleHome = async (product) => {
  try {
    const res = await axiosSecure.patch(`/products/${product._id}/show-home`, {
      showOnHome: !product.showOnHome,
    });

    // Show different alert based on new state
    if (res.data.showOnHome) {
      Swal.fire({
        icon: "success",
        title: `Product "${product.product_name}" is now visible on Home`,
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: `Product "${product.product_name}" removed from Home`,
        timer: 1200,
        showConfirmButton: false,
      });
    }

  
    setProducts((prev) =>
      prev.map((p) =>
        p._id === product._id ? { ...p, showOnHome: res.data.showOnHome } : p
      )
    );
  } catch (err) {
    Swal.fire("Error!", "Failed to update product visibility.", "error");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Created By</th>
              <th>Show on Home</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td>{product.product_name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.createdBy || "N/A"}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    checked={product.showOnHome || false}
                    onChange={() => handleToggleHome(product)}
                  />
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="btn btn-sm btn-info"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          setProduct={setSelectedProduct}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AdminAllProducts;
