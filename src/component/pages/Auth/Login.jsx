import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/UseAuth';


const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { signInUser} = useAuth();
    const handleLogin = (data) => {
            console.log("after login", data)
            signInUser(data.email, data.password)
            .then(result =>{
                console.log(result.user)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
            onSubmit={handleSubmit(handleLogin)}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                
                <div className="mb-4">
                    {/* email */}
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email', {required: true})}
                        placeholder="Enter your email"
                        className="input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.email?.type === "required" && <p className='text-red-500'>Email is required</p>}
                </div>
                {/* password */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        type="password"
                        {...register('password', {
                            required: true,
                            minLength:6,
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                        })}
                        placeholder="Enter your password"
                        className="input w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.password?.type === "required" && <p className='text-red-500'>Password is required</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-500'>Password must be 6 character or Longer</p>}
                    {errors.password?.type === "pattern" && <p className='text-red-500'>Password must have at least one uppercase, at least one lower case, at least one number and at least one special character</p>}
                
                </div>

                <div className="text-right mb-4">
                    <a href="#" className="text-blue-500 hover:underline text-sm">
                        Forgot password?
                    </a>
                </div>

<button type="submit" className="w-full btn  bg-blue-500 py-2 rounded-lg hover:bg-blue-600 ">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;