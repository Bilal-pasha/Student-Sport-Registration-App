"use client";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { passwordRegex } from "@/constant/constant";
import { publicRoutes } from "@/utils/routes";
import scoutsImage from "/public/assets/signinLogo.png";
import Image from "next/image";
import ArabiaLogo from "/public/assets/JamiaArabiaLogo.png"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter and one special character"
      )
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { username: string; password: string }) => {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        password: hashedPassword,
      }),
    });

    if (response.ok) {
      toast.success("User registered successfully");
      router.push(publicRoutes.AUTH_SIGN_IN);
    } else {
      toast.error("Failed to register");
      console.error("Failed to register");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm space-y-12">
        <div className="flex flex-col items-center justify-center pb-5">
          <Image
            src={scoutsImage}
            alt="Logo"
            width={400}
            height={200}
          />
           <Image
            src={ArabiaLogo}
            alt="Logo"
            width={300}
            height={200}
            className="object-contain"
          />
        </div>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="space-y-9">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <Field
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your username"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border-none rounded-md shadow-sm focus:outline-none"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-2 text-gray-500 hover:text-blue-500"
                  >
                    {!showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register Your Account
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
