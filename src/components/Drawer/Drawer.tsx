"use client";
import React, { useState } from "react";
import { Drawer as FlowbiteModal } from "flowbite-react";
import Image from "next/image";
import { UpdateStudentModal } from "@/components/UpdateStudentModal/UpdateStudentModal";
import { Button } from "../Button/Button";
import useSearchRole from "@/hooks/useSearchRole/useSearchRole";
import { ROLE } from "@/constant/constant";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineClose,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { studentDrawerMappingKeys } from "./Drawer.types";
import { IoPrintSharp } from "react-icons/io5";

interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar" }) => (
  <Image
    src={src}
    alt={alt}
    className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg"
    width={96}
    height={96}
  />
);
interface IStatusIndicator {
  status: string;
}

export const StatusIndicator: React.FC<IStatusIndicator> = ({ status }) => {
  const icon = {
    Approved: <AiOutlineCheck className="mr-2" />,
    Rejected: <AiOutlineClose className="mr-2" />,
    Pending: <AiOutlineClockCircle className="mr-2" />,
  }[status] || <AiOutlineClockCircle className="mr-2" />;

  const statusStyles =
    {
      Approved: "bg-green-200 text-green-700",
      Rejected: "bg-red-200 text-red-700",
      Pending: "bg-yellow-50 text-yellow-700",
    }[status] || "bg-gray-200 text-gray-700";

  return (
    <div className={`flex items-center px-3 py-1 rounded-lg ${statusStyles}`}>
      {icon}
      {status}
    </div>
  );
};

const customTheme = {
  root: {
    base: "fixed z-40 overflow-y-auto bg-white p-4 transition-transform duration-700 dark:bg-gray-800",
    position: {
      right: {
        on: "right-0 top-0 h-screen w-1/2 transform-none transition-all duration-700",
        off: "right-0 top-0 h-screen w-1/2 translate-x-full",
      },
    },
  },
};
interface IInfoCard {
  label: string;
  value: string;
}

const InfoCard: React.FC<IInfoCard> = ({ label, value }) => {
  if (label === "fileUrl" || label === "_id" || label === "madrasaId") {
    return null;
  }
  const displayName = studentDrawerMappingKeys[label] || label;
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
      {label === "status" ? (
        <div className="flex items-center justify-between">
          <span className="font-semibold">{displayName}:</span>
          <StatusIndicator status={value} /> {/* Pass status correctly */}
        </div>
      ) : (
        <>
          <span className="font-semibold">{displayName}:</span>
          <span className="ml-2">{value}</span>
        </>
      )}
    </div>
  );
};

const Drawer: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  rowData: any;
}> = ({ isOpen, handleClose, rowData }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const userName = useSearchRole();

  if (!rowData) return null;

  const handleDelete = async () => {
    const response = await fetch(`/api/delete-student/${rowData._id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Student deleted successfully.");
      handleClose();
    } else {
      const errorData = await response.json();
      toast.error(errorData.error || "Failed to delete student.");
    }
  };

  const renderButton = (rowData: any) => (
    <div className="flex justify-end space-x-4">
      {rowData.status === "Approve" && userName !== ROLE.ADMIN && (
        <Button
          variant="primary"
          size="lg"
          roundedness="md"
          className="px-8"
          onClick={() => {}}
        >
          <IoPrintSharp className="h-6 w-6" />
          Print
        </Button>
      )}
      <Button
        variant="danger"
        size="lg"
        roundedness="md"
        className="px-8"
        onClick={handleDelete}
      >
        Delete
      </Button>
      {userName === ROLE.ADMIN && (
        <Button
          variant="primary"
          size="lg"
          roundedness="md"
          className="px-8"
          onClick={() => setUpdateModalOpen(true)}
        >
          Update
        </Button>
      )}
    </div>
  );
  const studentImage = rowData.fileUrl;
  return (
    <>
      <FlowbiteModal
        open={isOpen}
        onClose={handleClose}
        position="right"
        theme={customTheme}
      >
        <FlowbiteModal.Header title="Student Details" />
        <FlowbiteModal.Items>
          <div className="flex flex-col justify-between h-[80vh]">
            <div className="flex p-6">
              <div className="flex-1">
                <h2 className="text-xl py-4 font-bold mb-4 text-center">
                  Student Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(rowData).map(
                    ([key, value]: any, index: number) => (
                      <InfoCard key={key + index} label={key} value={value} />
                    )
                  )}
                </div>
              </div>
              <div className="ml-4">
                <Avatar src={studentImage} alt="Student Avatar" />
              </div>
            </div>
            {renderButton(rowData)}
          </div>
        </FlowbiteModal.Items>
      </FlowbiteModal>
      {isUpdateModalOpen && (
        <UpdateStudentModal
          setModalOpen={setUpdateModalOpen}
          student={rowData}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default Drawer;
