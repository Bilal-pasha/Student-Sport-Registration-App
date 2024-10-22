import { useSession } from "next-auth/react";

const useSearchRole = () => {
  const { data: session } = useSession();

  // Check if session exists and return the user name
  if (session && session.user) {
    return session.user.name;
  }

  return null; // Return null if no session or user is found
};

export default useSearchRole;
