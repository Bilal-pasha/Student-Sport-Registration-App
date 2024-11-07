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
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "flowbite-react"; // Import Flowbite Dropdown
import toast from "react-hot-toast";

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

  const handleSelectStatus = async (newStatus: string, madrasaId: any) => {
    setSelectedStatus(newStatus);
    if (newStatus === "Delete") {
      try {
        const response = await fetch(`/api/get-madrasa/${madrasaId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const result = await response.json();
        toast.success(result.message);
        fetchMadrasas();
      } catch (error) {
        console.error("Error updating status:", error);
      }
    } else {
      try {
        const response = await fetch(
          `/api/update-madrasa-status/${madrasaId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const result = await response.json();
        console.log("Status updated successfully:", result);
        fetchMadrasas();
      } catch (error) {
        console.error("Error updating status:", error);
      }
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
  const dropdownOptions = ["Approved", "Rejected", "Delete"];
  // Loading Skeleton
  if (loading) {
    return <TableSkeleton numberOfRows={6} />;
  }
  return madrasas.length !== 0 ? (
    <>
      <div className="">
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
            {madrasas.map((madrasa) => (
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
                    <span
                      className="cursor-pointer"
                      onClick={() => handleStatusPending(madrasa.status)}
                    >
                      {madrasa.madrasaName}
                    </span>
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
                    <div className="flex items-center justify-center relative">
                      <Dropdown
                        label=""
                        renderTrigger={() => (
                          <BsThreeDotsVertical className="cursor-pointer" />
                        )}
                        className="absolute !left-[-60px] !top-5" // Adjust this value to move left
                      >
                        {dropdownOptions.map((dropdownItem, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() =>
                              handleSelectStatus(dropdownItem, madrasa._id)
                            }
                          >
                            {dropdownItem}
                          </Dropdown.Item>
                        ))}
                      </Dropdown>
                    </div>
                  </td>
                )}
              </tr>
            ))}
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
