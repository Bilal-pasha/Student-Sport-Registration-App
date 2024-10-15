import { FaGoogle, FaGithub } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image'; 

const SignIn = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (provider: 'google' | 'github') => {
    const response = await signIn(provider, { redirect: false });
    if (response?.error) {
      toast.error('Sign in failed');
      console.error('Sign in error:', response.error);
    } else {
      toast.success('Signed in successfully');
    }
    };

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          const res = await signIn('credentials', {
            redirect: false,
            username,
            password,
          });
          if (res?.error) {
            alert('Invalid credentials');
          }
        };

  return (
    <div className="flex items-center h-screen justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className='flex flex-col items-center justify-center pb-5'>
            <Image 
            src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png" 
            alt="Logo" 
            width={200}  /* Specify the width */
            height={100} /* Specify the height */
          />
          <p className="font-urduNastaliq text-3xl ">جامعہ عربیہ اسلامیہ <span className="text-xs">اسکاؤٹ کالونی</span></p>       
        </div>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User Id</label>
            <input
              type="text"
              id="email"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your User Id"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between mb-2">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-600" />
              <span className="ml-2 text-gray-700 text-sm">Remember me</span>
            </label>
            <Link href="#" className="text-sm text-blue-500 hover:underline">Forgot Password?</Link>
          </div>

          <div className="flex items-center justify-between mb-6">
            <div></div>
            <Link href="/Signup" className="text-sm text-blue-500 hover:underline">Sign Up?</Link>
          </div>

          {/* Login button */}
          <div className="mb-4">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
              Login
            </button>
          </div>

          {/* Divider */}
          {/* <div className="text-center my-4">
            <span className="text-gray-400">or</span>
          </div> */}

          {/* GitHub and Google buttons */}
          {/* <div className="mb-4">
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
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
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
