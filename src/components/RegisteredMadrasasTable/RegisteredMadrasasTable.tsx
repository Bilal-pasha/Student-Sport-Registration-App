import React, { useEffect, useState } from "react";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";
import { useSession } from "next-auth/react";
import { Button } from "../Button/Button";
import toast from "react-hot-toast";
import Link from "next/link";

import Image from "next/image";
import Typewriter from "@/components/TypeWritter/TypeWritter";
interface Madrasa {
  _id: string;
  madrasaName: string;
  madrasaAddress: string;
  totalStudents: number;
  createdAt: string;
  ContactPersonName: string;
  CellNumber: string;
  registeredStudents: string;
}

const MadrasaTable: React.FC = () => {
  const [madrasas, setMadrasas] = useState<Madrasa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  // Fetch madrasas on component mount or session change
  useEffect(() => {
    if (!session?.user?.name) return;

    const fetchMadrasas = async () => {
      setLoading(true); // Set loading state before fetching
      try {
        const response = await fetch(`/api/get-madrasa/${session?.user?.name}`);
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
        setLoading(false); // Stop loading state after fetching
      }
    };

    fetchMadrasas();
  }, [session]);
  // Handle madrasa deletion
  const handleDelete = async (madrasaId: string) => {
    try {
      // Make the DELETE request to the API
      const res = await fetch(`/api/get-madrasa/${madrasaId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete madrasa");
        return;
      }

      // Parse the response to JSON
      const data = await res.json();

      if (data.success) {
        // Show success toast notification
        toast.success("Madrasa deleted successfully");
        setMadrasas(data?.remainingMadrasas);
      } else {
        toast.error("Failed to delete madrasa");
      }
    } catch (error: any) {
      toast.error(error.message || "Error deleting madrasa");
    }
  };

  // Loading state skeleton
  if (loading) {
    return <TableSkeleton numberOfRows={6} />;
  }

  // Table Headings
  const tableHeadings = [
    "Madrasa Name",
    "Madrasa Address",
    "Total Students",
    "Contact Person Name",
    "Cell Number",
    "Registered On",
    "Registered Students",
  ];

  return madrasas.length !== 0 ? (
    <div className="overflow-x-auto">
      <table className="w-full bg-white opacity-90 text-left">
        <thead className="bg-[#714620fa] text-white text-sm uppercase">
          <tr>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="py-3 px-5 border-b border-gray-400">
                {heading}
              </th>
            ))}
            {/* <th className="py-3 px-5 border-b border-gray-400">Actions</th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {madrasas.length === 0 ? (
            <tr>
              <td
                colSpan={tableHeadings.length + 1}
                className="py-3 px-5 text-center"
              >
                No madrasas found
              </td>
            </tr>
          ) : (
            madrasas.map((madrasa) => (
              <tr key={madrasa?._id}>
                <td className="py-3 px-5 border-b border-gray-300">
                  <Link
                    href={`/Home/${madrasa?._id}`}
                    className="text-primary-500"
                  >
                    {madrasa.madrasaName}
                  </Link>
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {madrasa.madrasaAddress}
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {madrasa.totalStudents}
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {madrasa.ContactPersonName}
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {madrasa.CellNumber}
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {new Date(madrasa.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 border-b border-gray-300">
                  {madrasa.registeredStudents}
                </td>
                {/* <td className="py-3 px-5 border-b border-gray-300 text-right">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(madrasa?._id)}
                  >
                    Delete
                  </Button>
                </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  ) : (
    <>
      <div>
        <h2 className="text-sm text-white">You Don&apos;t hava any Registered madrasa yet</h2>
        <div className="flex justify-center py-8">
          <Button variant={"primary"} size={"lg"}>
            <Link href={"/registration"}>Register Your Madrasa Now</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default MadrasaTable;
