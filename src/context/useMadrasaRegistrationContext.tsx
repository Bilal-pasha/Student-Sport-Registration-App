"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

interface Madrasa {
  _id: string;
  madrasaName: string;
  madrasaAddress: string;
  totalStudents: number;
  createdAt: string;
  contactPersonName: string;
  cellNumber: string;
  registeredStudents: string;
  status: string;
}

interface MadrasaContextType {
  madrasas: Madrasa[];
  loading: boolean;
  fetchMadrasas: () => void;
}

const MadrasaRegistrationContext = createContext<
  MadrasaContextType | undefined
>(undefined);

export const useMadrasaRegistrationContext = () => {
  const context = useContext(MadrasaRegistrationContext);
  if (!context) {
    throw new Error(
      "useMadrasaRegistrationContext must be used within a MadrasaRegistrationProvider"
    );
  }
  return context;
};

interface MadrasaProviderProps {
  children: ReactNode;
}

export const MadrasaRegistrationProvider: React.FC<MadrasaProviderProps> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [madrasas, setMadrasas] = useState<Madrasa[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMadrasas = async () => {
    if (!session?.user?.name) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/get-madrasa/${session.user.name}`);
      const resData = await response.json();
      if (response.ok) {
        setMadrasas(resData.data);
      } else {
        toast.error("Failed to fetch madrasas");
      }
    } catch (error) {
      console.error("Error fetching madrasas:", error);
      toast.error("Error fetching madrasas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMadrasas();
  }, [session]);

  return (
    <MadrasaRegistrationContext.Provider
      value={{ madrasas, loading, fetchMadrasas }}
    >
      {children}
    </MadrasaRegistrationContext.Provider>
  );
};
