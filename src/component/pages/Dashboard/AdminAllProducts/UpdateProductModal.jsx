import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


const UpdateProductModal = ({ product, setProduct, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    image: product.image,
    demoVideo: product.demoVideo,
    paymentOptions: product.paymentOptions,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axiosSecure.patch(`/products/${product._id}`, formData);
    refetch();
    setProduct(null);
    Swal.fire("Updated!", "Product updated successfully.", "success");
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Update Product</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} className="input input-bordered" placeholder="Product Name" />
          <input name="price" value={formData.price} onChange={handleChange} className="input input-bordered" placeholder="Price" />
          <input name="category" value={formData.category} onChange={handleChange} className="input input-bordered" placeholder="Category" />
          <input name="image" value={formData.image} onChange={handleChange} className="input input-bordered" placeholder="Image URL" />
          <input name="demoVideo" value={formData.demoVideo} onChange={handleChange} className="input input-bordered" placeholder="Demo Video URL" />
          <input name="paymentOptions" value={formData.paymentOptions} onChange={handleChange} className="input input-bordered" placeholder="Payment Options" />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered col-span-2"
            placeholder="Description"
          />

          <div className="modal-action col-span-2">
            <button type="submit" className="btn btn-success">Update</button>
            <button type="button" onClick={() => setProduct(null)} className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateProductModal;
