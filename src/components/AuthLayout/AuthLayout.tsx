"use client";

import { useSession } from 'next-auth/react';
import SignIn from '@/components/SignIn/SignIn';
import { useRouter } from 'next/navigation';
import { protectedRoutes } from '@/utils/routes';
const AuthLayout: React.FC = () => {
  const { data: session } = useSession();
  const route = useRouter()
  return (
    <>
      {session ? route.push(protectedRoutes.HOME) : <SignIn />}
    </>
  );
};

export default AuthLayout;
