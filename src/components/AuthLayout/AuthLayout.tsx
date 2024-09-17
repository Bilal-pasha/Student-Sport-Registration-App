"use client";

import { useSession } from 'next-auth/react';
import SignIn from '@/components/SignIn/SignIn';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
const AuthLayout: React.FC = () => {
  const { data: session } = useSession();
  const route = useRouter()
  return (
    <>
      {session ? toast.success("Sign In Successfully") && route.push("/Home") : <SignIn />}
    </>
  );
};

export default AuthLayout;
