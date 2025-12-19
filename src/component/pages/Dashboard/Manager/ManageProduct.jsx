import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useState } from "react";
import useAuth from "../../../../hooks/UseAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function ManageProduct() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const { refetch, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
    enabled: !!user,
  });

  const filteredProducts = products.filter(
    (p) =>
      p.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then(() => {
          refetch();
          Swal.fire("Deleted!", "Product has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <input
        type="text"
        placeholder="Search by name or category"
        className="input input-bordered w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Payment Mode</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <img
                  src={product.product_image?.[0]} // fixed
                  alt={product.product_name}
                  className="w-16 h-16 rounded object-cover"
                />
              </td>
              <td>{product.product_name}</td> {/* fixed */}
              <td>৳{product.price}</td>
              <td>{product.paymentOption}</td>
              <td className="flex gap-2">
                <Link
                  to={`/dashboard/update-product/${product._id}`}
                  className="btn btn-sm btn-info"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredProducts.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
