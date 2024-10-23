"use client";
import React, { useState } from "react";
import { Drawer as FlowbiteModal } from "flowbite-react";
import Image from "next/image";
import { UpdateStudentModal } from "@/components/UpdateStudentModal/UpdateStudentModal";
import { Button } from "../Button/Button";
import studentImage from "/public/assets/male-student.png";
import useSearchRole from "@/hooks/useSearchRole/useSearchRole";
import { ROLE } from "@/constant/constant";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"; // Import icons

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

const InfoCard: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200">
    {label === "status" ? ( // Assuming the label for status is "status"
      <div className="flex items-center justify-between">
        <span className="font-semibold">{label}:</span>
        <StatusIndicator status={value} /> {/* Display status */}
      </div>
    ) : (
      <>
        <span className="font-semibold">{label}:</span>
        <span className="ml-2">{value}</span>
      </>
    )}
  </div>
);

const StatusIndicator: React.FC<{ status: string | number }> = ({ status }) => {
  const isApproved = status === "Approve";
  const isRejected = status === "Decline";

  return (
    <div
      className={`flex items-center px-3 py-1 rounded-lg ${
        isApproved
          ? "bg-green-200 text-green-700"
          : isRejected
          ? "bg-red-200 text-red-700"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {isApproved && <AiOutlineCheck className="mr-2" />}
      {isRejected && <AiOutlineClose className="mr-2" />}
      {isApproved ? "Approved" : isRejected ? "Rejected" : "Pending"}
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

  const renderButton = () => (
    <div className="flex justify-end space-x-4">
      <Button
        variant="primary"
        size="lg"
        roundedness="md"
        className="px-8"
        onClick={() => setUpdateModalOpen(true)}
      >
        Update
      </Button>
    </div>
  );

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
                  {Object.entries(rowData).map(([key, value]: any) => (
                    <InfoCard key={key} label={key} value={value} />
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <Avatar src={studentImage.src} alt="Student Avatar" />
              </div>
            </div>
            {userName === ROLE.ADMIN && renderButton()}
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
