import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

import useAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SideImage from '../../../../public/assest/illustration-tailor-sewing-clothes_207579-2039.avif';
import SocialLogin from './SocialLogin';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
     
      await registerUser(data.email, data.password);

      // Upload profile image to imgbb
      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      // Update user profile
      await updateUserProfile({
        displayName: data.name,
        photoURL
      });

      // Save user info to DB
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL,
        role: data.role,  
        status: "pending"
      };
      await axiosSecure.post("/users", userInfo);

     
      Swal.fire({
        title: "Registration Successful",
        text: "Your account was created. Status: pending",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate("/"); 
      });

    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "Please check your details.",
        icon: "error"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-10">
        {/* LEFT: Image */}
        <div className="hidden md:block md:w-1/2 rounded-b-4xl">
          <img
            src={SideImage}
            alt="Register side"
            className="w-full h-full object-cover rounded-3xl"
          />
        </div>

        {/* RIGHT: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Create an Account</h2>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-6">
            <fieldset className="fieldset">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: true })}
                  placeholder="Enter your name"
                  className="input w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">Name is required</p>}
              </div>

              {/* Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                <input type="file" className="file-input" {...register('photo', { required: true })} />
                {errors.photo && <p className="text-red-500 text-sm mt-1">Photo is required</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                  })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {errors.password?.type === 'required' && <p className="text-red-500 text-sm mt-1">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-500 text-sm mt-1">Must include uppercase, lowercase, number & special character</p>}
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  {...register("role", { required: true })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="manager">Manager</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm mt-1">Role is required</p>}
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button type="button" className="text-indigo-600 hover:underline text-sm">Forgot password?</button>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Register
                </button>
              </div>
            </fieldset>

            {/* Social Login */}
            <SocialLogin />

           
            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <span className="text-indigo-600 font-bold ml-1">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
