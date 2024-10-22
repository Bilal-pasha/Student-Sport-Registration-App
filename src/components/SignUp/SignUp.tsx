"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password: hashedPassword,
      }),
    });
    if (response.ok) {
      toast.success("User registered successfully");
      router.push("/Login");
    } else {
      console.error("Failed to register");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center justify-center pb-5">
          <Image
            src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png"
            alt="Logo"
            width={200} /* Specify the width */
            height={100} /* Specify the height */
          />
          <p className="font-urduNastaliq text-3xl ">
            جامعہ عربیہ اسلامیہ <span className="text-xs">اسکاؤٹ کالونی</span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-9">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
            />
          </div>
          <div className="relative">
            {" "}
            {/* Added relative positioning for the password input */}
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full p-2 border-none rounded-md shadow-sm focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="px-2 text-gray-500 hover:text-blue-500" // Button styling
              >
                {!showPassword ? (
                  <AiFillEyeInvisible size={24} />
                ) : (
                  <AiFillEye size={24} />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
