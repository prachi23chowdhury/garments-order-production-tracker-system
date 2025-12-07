import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';
import SideImage from '../../../../public/assest/illustration-tailor-sewing-clothes_207579-2039.avif';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser } = useAuth();

  const handleRegistration = (data) => {
    registerUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row gap-10">

        {/* LEFT: Image (hidden on small screens) */}
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: true })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              {errors.email?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label  className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                })}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {errors.password?.type === 'required' && (
                <p className="text-red-500 text-sm mt-1">Password is required</p>
              )}
              {errors.password?.type === 'minLength' && (
                <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
              )}
              {errors.password?.type === 'pattern' && (
                <p className="text-red-500 text-sm mt-1">Must include uppercase, lowercase, number & special character</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="text-right">
              <button type="button" className="text-indigo-600 hover:underline text-sm">Forgot password?</button>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
    className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-400">
                Register </button>
            </div>


            {/* Google */}
              <SocialLogin></SocialLogin>

            {/* one line */}
       
            <p className="text-center text-sm text-gray-500">
                         All ready have Account ?
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
