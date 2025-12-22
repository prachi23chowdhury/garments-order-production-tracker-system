import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function UpdateProduct() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    product_name: "",
    category: "",
    price: "",
    available_quantity: "",
    paymentOption: "",
    product_image: "",
  });

  // Load product
  useEffect(() => {
    axiosSecure
      .get(`/products/${id}`)
      .then((res) => {
        const data = res.data;
        setProduct({
          product_name: data.product_name || "",
          category: data.category || "",
          price: data.price || "",
          available_quantity: data.available_quantity || "",
          paymentOption: data.paymentOption || "",
          product_image: data.product_image || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "available_quantity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/products/${id}`, product);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Product updated successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setTimeout(() => {
        navigate("/dashboard/manage-product");
      }, 2000);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update product", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={product.product_name}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="number"
          name="available_quantity"
          placeholder="Available Quantity"
          value={product.available_quantity}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="paymentOption"
          placeholder="Payment Option"
          value={product.paymentOption}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="product_image"
          placeholder="Product Image URL"
          value={product.product_image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}
