import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons
import scoutsImage from "/public/assets/signinLogo.png";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // const handleSignIn = async (provider: "google" | "github") => {
  //   const response = await signIn(provider, { redirect: false });
  //   if (response?.error) {
  //     toast.error("Sign in failed");
  //     console.error("Sign in error:", response.error);
  //   } else {
  //     toast.success("Signed in successfully");
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (res?.error) {
      toast.error("User Id / Password Incorrect");
    }
  };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="p-8 m-6 md:m-0 rounded-lg shadow-2xl drop-shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center justify-center pb-5">
          <Image
            src={scoutsImage}
            alt="Logo"
            width={400} /* Specify the width */
            height={200} /* Specify the height */
            className="object-contain"
          />
          <p className="font-urduNastaliq text-3xl ">
            جامعہ عربیہ اسلامیہ <span className="text-xs">اسکاؤٹ کالونی</span>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {/* User Id input */}
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              User Id
            </label>
            <input
              type="text"
              id="userId"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your User Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password input */}
          <div className="mb-6 relative">
            {" "}
            {/* Added relative for positioning */}
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative mb-6">
              <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={showPassword ? "text" : "password"} // Toggle input type
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
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
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2 text-gray-700 text-sm">Remember me</span>
            </label>
            <Link href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div></div>
            <Link
              href="/Signup"
              className="text-sm text-blue-500 hover:underline"
            >
              Register?
            </Link>
          </div>

          {/* Login button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

{
  /* Divider */
}
{
  /* <div className="text-center my-4">
            <span className="text-gray-400">or</span>
          </div> */
}

{
  /* GitHub and Google buttons */
}
{
  /* <div className="mb-4">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-200 mb-3"
              onClick={() => handleSignIn('github')}
            >
              <FaGithub className="mr-2" />
              Continue with GitHub
            </button>
          </div>
          <div>
            <button
              type="button"
              className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-200"
              onClick={() => handleSignIn('google')}
            >
              <FaGoogle className="mr-2" />
              Continue with Google
            </button>
          </div> */
}
{
  /* </form>
      </div>
    </div>
  );
}; */
}

// export default SignIn;
// import { signIn } from 'next-auth/react';
// import { useState } from 'react';

// export default function SignIn() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await signIn('credentials', {
//       redirect: false,
//       username,
//       password,
//     });
//     if (res?.error) {
//       alert('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded">
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="border border-gray-300 p-2"
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-300 p-2"
//           />
//         </div>
//         <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Sign In</button>
//       </form>
//     </div>
//   );
// }
