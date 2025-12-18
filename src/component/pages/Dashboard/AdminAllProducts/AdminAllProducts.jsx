import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import UpdateProductModal from "./UpdateProductModal";

const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { data: products = [], refetch, isLoading } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  // Delete Product
  const handleDelete = (product) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/products/${product._id}`);
        refetch();
        Swal.fire("Deleted!", "Product has been deleted.", "success");
      }
    });
  };

  // Show on Home toggle
  const handleToggleHome = async (product) => {
    await axiosSecure.patch(`/products/${product._id}`, {
      showOnHome: !product.showOnHome,
    });
    refetch();
  };

  if (isLoading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

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

                <td className="flex gap-3">
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

      {/* Update Modal */}
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
