"use client";

import { useSession } from 'next-auth/react';
import SignIn from '@/components/SignIn/SignIn';
import { useRouter } from 'next/navigation';

const AuthLayout: React.FC = () => {
  const { data: session } = useSession();
  const route = useRouter()
  return (
    <>
      {session ? route.push("/Home") : <SignIn />}
    </>
  );
};

export default AuthLayout;
