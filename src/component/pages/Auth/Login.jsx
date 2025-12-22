import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

import SideImage from "../../../../public/assest/illustration-tailor-sewing-clothes_207579-2039.avif";
import SocialLogin from "./SocialLogin";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  const handleLogin = async (data) => {
    try {
      //  FIREBASE LOGIN
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = result.user;

      // FIREBASE TOKEN
      const token = await user.getIdToken(true);
      console.log(" FIREBASE TOKEN:", token);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* IMAGE */}
        <div className="w-full md:w-1/2">
          <img src={SideImage} alt="Login" className="w-full h-48 md:h-full object-cover" />
        </div>

        {/* FORM */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

              <div>
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>

              <div>
                <label>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="w-full px-4 py-3 border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-indigo-600 text-white rounded-lg"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <SocialLogin />

              <p className="text-center text-sm">
                Don’t have an account?
                <Link to="/register" className="text-indigo-600 ml-1">Register</Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
