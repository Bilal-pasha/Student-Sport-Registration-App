import { FaGoogle, FaGithub } from 'react-icons/fa';
import {signIn } from "next-auth/react";

const SignIn: React.FC= () => {
    return (
      <div className="flex items-center h-screen justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login to Your Account</h2>
          
          <form>
            {/* Email input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
  
            {/* Password input */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
  
            {/* Remember me checkbox */}
            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600" />
                <span className="ml-2 text-gray-700 text-sm">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
            </div>
  
            {/* Login button */}
            <div className="mb-4">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                Login
              </button>
            </div>
  
            {/* Divider */}
            <div className="text-center my-4">
              <span className="text-gray-400">or</span>
            </div>
  
            {/* GitHub and Google buttons */}
            <div className="mb-4">
              <button
                type="button"
                className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-200 mb-3"
                onClick={() => signIn("github")}
              >
                <FaGithub className="mr-2" />
                Continue with GitHub
              </button>
            </div>
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-200"
                onClick={() => signIn("google")}
              >
                <FaGoogle className="mr-2" />
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  export default SignIn