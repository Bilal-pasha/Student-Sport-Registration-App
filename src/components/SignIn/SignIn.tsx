import { signIn } from "next-auth/react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons
import scoutsImage from "/public/assets/signinLogo.png";
import { protectedRoutes, publicRoutes } from "@/utils/routes";
import { useRouter } from "next/navigation";

interface SignInFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const router = useRouter()
  const initialValues: SignInFormValues = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values: SignInFormValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
    });

    if (res?.error) {
      toast.error("User Id / Password Incorrect");
    } else {
      router.push(protectedRoutes.HOME)
      toast.success("Signed in successfully");
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="p-8 m-6 md:m-0 rounded-lg shadow-2xl drop-shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center justify-center pb-5">
          <Image
            src={scoutsImage}
            alt="Logo"
            width={400}
            height={200}
            className="object-contain"
          />
          <p className="font-urduNastaliq text-3xl ">
            جامعہ عربیہ اسلامیہ <span className="text-xs">اسکاؤٹ کالونی</span>
          </p>
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {/* User Id input */}
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  User Id
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your User Id"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password input */}
              <div className="mb-6 relative">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-2 text-gray-500 hover:text-blue-500"
                    >
                      {!showPassword ? (
                        <AiFillEyeInvisible size={24} />
                      ) : (
                        <AiFillEye size={24} />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between mb-2">
                <label className="inline-flex items-center">
                  <Field
                    type="checkbox"
                    name="rememberMe"
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    Remember me
                  </span>
                </label>
                <Link
                  href="#"
                  className="text-sm text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div></div>
                <Link
                  href={publicRoutes.AUTH_SIGN_UP}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Register?
                </Link>
              </div>

              {/* Login button */}
              <div className="mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-semibold py-2 px-4 rounded-lg w-full transition-colors duration-200`}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
