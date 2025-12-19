import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/UseAuth";

export default function AddProduct() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [images, setImages] = useState([""]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
    setImagesPreview(newImages.filter(url => url));
  };

  const addImageInput = () => setImages([...images, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const productData = {
      product_name: form.get("title"),
      product_description: form.get("description"),
      category: form.get("category"),
      price: form.get("price"),
      available_quantity: form.get("available_quantity"),
      product_image: images[0] || "", // first image URL
      demoVideo: form.get("demoVideo") || "",
      paymentOption: form.get("paymentOption"),
      showOnHome: form.get("showOnHome") === "on",
      sellerEmail: user?.email,
      createdAt: new Date(),
      deliveryStatus: "pending",
      paymentStatus: "paid",
      trackingId: `PRCL-${Date.now()}`,
    };

    try {
      const result = await axiosSecure.post("/products", productData);

      if (result.data.insertedId || result.data.success) {
        await Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });

        e.target.reset();
        setImages([""]);
        setImagesPreview([]);
        window.location.href = "/dashboard/manage-products";
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add product. Try again!",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center">Add New Product</h2>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Product Name</label>
        <input
          name="title"
          placeholder="Enter product name"
          required
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Product Description</label>
        <textarea
          name="description"
          placeholder="Enter product description"
          required
          className="border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Category</label>
        <select
          name="category"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>T-shirt</option>
          <option>Jeans / Pant</option>
          <option>Jacket</option>
          <option>Accessories</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium mb-1">Available Quantity</label>
          <input
            type="number"
            name="available_quantity"
            placeholder="Quantity"
            required
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Product Image URLs</label>
        {images.map((img, i) => (
          <input
            key={i}
            type="url"
            value={img}
            placeholder="Enter image URL"
            onChange={(e) => handleImageChange(i, e.target.value)}
            className="border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          type="button"
          onClick={addImageInput}
          className="text-blue-500 hover:underline text-left mb-2"
        >
          + Add another image
        </button>
      </div>

      {imagesPreview.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {imagesPreview.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Preview ${i + 1}`}
              className="w-24 h-24 object-cover rounded shadow"
            />
          ))}
        </div>
      )}

      <div className="flex flex-col">
        <label className="font-medium mb-1">Demo Video Link (optional)</label>
        <input
          name="demoVideo"
          placeholder="https://..."
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium mb-1">Payment Option</label>
        <select
          name="paymentOption"
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="PayFirst">Pay First</option>
        </select>
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="showOnHome" className="w-4 h-4" />
        Show on Home Page
      </label>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Add Product
      </button>
    </form>
  );
}
