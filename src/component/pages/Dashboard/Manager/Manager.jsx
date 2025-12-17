import React, { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Manager = () => {
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    nid: "",
    contact: "",
    warehouse: "",
    experience: "",
    previousJob: "",
    qualification: "",
  });

  const warehouses = [
    "Dhaka Warehouse",
    "Chattogram Warehouse",
    "Sylhet Warehouse"
  ];
  const experiences = ["1 year", "2 years", "3 years"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleManagerApplication = async (e) => {
    e.preventDefault(); 

    try {
      const res = await axiosSecure.post("/managers", formData);

      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your application has been submitted",
          showConfirmButton: false,
          timer: 2000,
        });

    
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Apply for Manager</h2>

      <form onSubmit={handleManagerApplication} className="space-y-4">
        <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input type="number" name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="nid" placeholder="NID No" value={formData.nid} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} required className="w-full p-2 border rounded" />

        <select name="warehouse" value={formData.warehouse} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select warehouse</option>
          {warehouses.map((wh, i) => (
            <option key={i} value={wh}>{wh}</option>
          ))}
        </select>

        <select name="experience" value={formData.experience} onChange={handleChange} required className="w-full p-2 border rounded">
          <option value="">Select experience</option>
          {experiences.map((exp, i) => (
            <option key={i} value={exp}>{exp}</option>
          ))}
        </select>

        <input name="previousJob" placeholder="Previous Job" value={formData.previousJob} onChange={handleChange} required className="w-full p-2 border rounded" />

        <input name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} required className="w-full p-2 border rounded" />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Manager;
