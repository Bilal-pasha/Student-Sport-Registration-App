import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";
import { Button } from "@/components/Button/Button";
import { useMadrasaRegistrationContext } from "@/context/useMadrasaRegistrationContext";
import { StatusIndicator } from "@/components/Drawer/Drawer";
import { ROLE, STATUS } from "@/constant/constant";
import { NotificationModal } from "@/components/Modal/NotificationModal";
import useSearchRole from "@/hooks/useSearchRole/useSearchRole";
import { protectedRoutes } from "@/utils/routes";

const MadrasaTable: React.FC = () => {
  const { madrasas, loading, fetchMadrasas } = useMadrasaRegistrationContext();
  const [openModal, setOpenModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const [currentStatus, setCurrentStatus] = useState("");
  const userName = useSearchRole();

  useEffect(() => {
    // Fetch madrasas on component mount
    fetchMadrasas();
  }, []);

  const handleSelectStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    madrasaId: any
  ) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    try {
      const response = await fetch(`/api/update-madrasa-status/${madrasaId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const result = await response.json();
      console.log("Status updated successfully:", result);
      fetchMadrasas();
      // Optionally, add success feedback or refetch data if needed
    } catch (error) {
      console.error("Error updating status:", error);
      // Optionally, add error feedback for the user
    }
  };

  const handleStatusPending = (status: string) => {
    setCurrentStatus(status);
    setOpenModal(true);
  };

  // Table Headings
  const tableHeadings = [
    "Madrasa Name",
    "Madrasa Address",
    "Total Students",
    "Contact Person Name",
    "Cell Number",
    "Registered On",
    "Registered Students",
    "Status",
  ];
  if (userName === ROLE.ADMIN) {
    tableHeadings.push("Actions");
  }

  // Loading Skeleton
  if (loading) {
    return <TableSkeleton numberOfRows={6} />;
  }
  return madrasas.length !== 0 ? (
    <>
      <div className="overflow-x-auto">
        <table className="w-full bg-white opacity-90 text-left">
          <thead className="bg-[#714620fa] text-white text-sm uppercase">
            <tr>
              {tableHeadings.map((heading, index) => (
                <th key={index} className="py-3 px-5 border-b border-gray-400">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {madrasas.length === 0 ? (
              <tr>
                <td
                  colSpan={tableHeadings.length}
                  className="py-3 px-5 text-center"
                >
                  No madrasas found
                </td>
              </tr>
            ) : (
              madrasas.map((madrasa) => (
                <tr key={madrasa?._id}>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.status === STATUS.APPROVED ? (
                      <Link
                        href={`${protectedRoutes.HOME}/${madrasa?._id}`}
                        className="text-primary-500"
                      >
                        {madrasa.madrasaName}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleStatusPending(madrasa.status)}
                      >
                        {madrasa.madrasaName}
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.madrasaAddress}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.totalStudents}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.contactPersonName}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.cellNumber}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {new Date(madrasa.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300">
                    {madrasa.registeredStudents}
                  </td>
                  <td className="py-3 px-5 border-l border-gray-300 space-x-3">
                    <StatusIndicator status={madrasa.status} />
                  </td>
                  {userName === ROLE.ADMIN && (
                    <td className="py-3 px-5 border-l border-gray-300">
                      <select
                        value={madrasa.status}
                        onChange={(event) =>
                          handleSelectStatus(event, madrasa?._id)
                        }
                        className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition ease-in-out duration-150 hover:bg-gray-100"
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <NotificationModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        text={`${
          currentStatus === "Pending"
            ? "Your registration status is currently pending. Please wait until it is approved to proceed with your madrasa registration."
            : "Your registration status is currently Rejected. Please Contact SupportArabia@gmail.com"
        }`}
      />
    </>
  ) : (
    <div>
      <h2 className="text-sm text-white">
        You don&apos;t have any registered madrasas yet
      </h2>
      <div className="flex justify-center py-8">
        <Button variant="primary" size="lg">
          <Link href="/registration">Register Your Madrasa Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default MadrasaTable;
