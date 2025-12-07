import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';

const Register = () => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="bg-white backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Create an Account
        </h2>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="Enter your email"
            className="input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            {...register('password', {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            })}
            placeholder="Enter your password"
            className="input w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500 text-sm">Password must be at least 6 characters</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500 text-sm">
              Must include uppercase, lowercase, number & special character
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right mb-4">
          <button type="button" className="text-indigo-600 hover:underline text-sm">
            Forgot password?
          </button>
        </div>

        {/* Register Button */}
        <button type="submit" className="">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
