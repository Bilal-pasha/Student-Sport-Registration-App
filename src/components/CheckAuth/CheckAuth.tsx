// Create a HOC (e.g., /components/withAuth.tsx)

import { publicRoutes } from "@/utils/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckAuthentication = (WrappedComponent: React.ComponentType) => {
  const Auth = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push(publicRoutes.AUTH_SIGN_IN);
      }
    }, [status, router]);

    if (session) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return Auth;
};

export default CheckAuthentication;
