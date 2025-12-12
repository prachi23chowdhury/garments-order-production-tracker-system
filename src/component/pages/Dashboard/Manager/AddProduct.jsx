import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const productData = {
      title: form.get("title"),
      description: form.get("description"),
      category: form.get("category"),
      price: Number(form.get("price")),
      quantity: Number(form.get("quantity")),
      moq: Number(form.get("moq")),
      demoVideo: form.get("demoVideo"),
      paymentOption: form.get("paymentOption"),
      showOnHome: form.get("showOnHome") === "on" ? true : false,
      createdAt: new Date()
    };

    const result = await axiosSecure.post("/products", productData);
    if (result.data.insertedId) {
      alert("Product Added Successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-5">
      <input name="title" placeholder="Product Name" required />
      <textarea name="description" placeholder="Product Description" required></textarea>

      <select name="category">
        <option>Shirt</option>
        <option>Pant</option>
        <option>Jacket</option>
        <option>Accessories</option>
      </select>

      <input type="number" name="price" placeholder="Price" required />
      <input type="number" name="quantity" placeholder="Available Quantity" required />
      <input type="number" name="moq" placeholder="Minimum Order Quantity" required />

      <input type="file" multiple accept="image/*" onChange={handleImageChange} />

      {/* Image Preview */}
      <div className="flex gap-3">
        {imagesPreview.map((img, i) => (
          <img key={i} src={img} className="w-20 h-20 object-cover rounded" />
        ))}
      </div>

      <input name="demoVideo" placeholder="Demo Video Link (optional)" />

      <select name="paymentOption">
        <option value="COD">Cash On Delivery</option>
        <option value="PayFirst">Pay First</option>
      </select>

      <label>
        <input type="checkbox" name="showOnHome" /> Show on Home Page
      </label>

      <button type="submit" className="btn btn-primary">Add Product</button>
    </form>
  );
}
