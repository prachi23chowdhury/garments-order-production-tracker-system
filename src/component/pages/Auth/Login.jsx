import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';
import SideImage from '../../../../public/assest/illustration-tailor-sewing-clothes_207579-2039.avif';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { signInUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    // disable button while submitting handled by isSubmitting from RHF when used with async
    signInUser(data.email, data.password)
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* IMAGE: show on small above form and on md as left column */}
        <div className="w-full md:w-1/2">
          {/* mobile image */}
          <div className="block md:hidden w-full h-44">
            <img src={SideImage} alt="Login side" loading="lazy" className="w-full h-full object-cover" />
          </div>

          {/* md+ image */}
          <div className="hidden md:block md:h-full md:w-full">
            <img src={SideImage} alt="Login side" loading="lazy" className="w-full h-full object-cover rounded-l-2xl" />
          </div>
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-800">Welcome Back</h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: true,
                      minLength: 6,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-2 top-2/4 -translate-y-2/4 text-sm px-2 py-1 rounded"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>

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

              {/* Forgot */}
              <div className="text-right">
                <Link to="/forgot-password" className="text-indigo-600 hover:underline text-sm">Forgot password?</Link>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-60"
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </button>
              </div>

              {/* Social Login centered */}
              <div className="pt-1">
                <SocialLogin />
              </div>

              {/* Switch */}
              <p className="text-center text-sm text-gray-500">
                Don’t have an account?
                <span className="text-indigo-600 font-bold ml-1">
                  <Link to="/register">Register</Link>
                </span>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
