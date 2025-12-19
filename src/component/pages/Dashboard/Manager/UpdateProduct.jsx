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
    product_image: [],
    paymentOption: "",
  });
  const [image, setImage] = useState("");

  // Load product info
  useEffect(() => {
    axiosSecure.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = { ...product };
    if (image) updatedProduct.product_image = [image]; // single image for now

    try {
      await axiosSecure.put(`/products/${id}`, updatedProduct);
      Swal.fire("Success", "Product updated successfully", "success");
      navigate("/dashboard/manage-product");
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
          placeholder="Product Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full">
          Update Product
        </button>
      </form>
    </div>
  );
}