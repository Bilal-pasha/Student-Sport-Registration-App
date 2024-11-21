"use client";
import React, { useRef, useState } from "react";
import { Drawer as FlowbiteModal } from "flowbite-react";
import Image from "next/image";
import { UpdateStudentModal } from "@/components/UpdateStudentModal/UpdateStudentModal";
import { Button } from "../Button/Button";
import useSearchRole from "@/hooks/useSearchRole/useSearchRole";
import { ROLE, STATUS, SubCamps } from "@/constant/constant";
import {
  AiOutlineCheck,
  AiOutlineClockCircle,
  AiOutlineClose,
} from "react-icons/ai";
import toast from "react-hot-toast";
import { studentDrawerMappingKeys } from "./Drawer.types";
import { IoPrintSharp } from "react-icons/io5";
import ReactToPrint from "react-to-print";
import IqbalCampSlipImage from "/public/assets/iqbalCamp.jpeg";
import JinnahCampSlipImage from "/public/assets/jinnahCamp.jpeg";
import LiaqatCampSlipImage from "/public/assets/liaqatCamp.jpeg";
import fallbackSrc from "/public/assets/male-student.png";
interface AvatarProps {
  src: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar" }) => {
  return (
    <Image
      src={src || fallbackSrc}
      alt={alt}
      className="w-24 h-24 rounded-full border-2 border-gray-300 shadow-lg"
      width={96}
      height={96}
    />
  );
};

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
          <StatusIndicator status={value} />
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
// eslint-disable-next-line react/display-name
const PrintContent = React.forwardRef<HTMLDivElement, { rowData: any }>(
  ({ rowData }, ref) => {
    // Ensure rowData is an array
    const dataArray = Array.isArray(rowData) ? rowData : [rowData];

    return (
      <div
        ref={ref}
        className="w-full h-full print-page grid grid-cols-4 gap-4 p-4"
        style={{
          height: "297mm", // A4 height
          width: "210mm", // A4 width
        }}
      >
        {dataArray.slice(0, 8).map((data, index) => (
          <div
            key={index}
            className="flex flex-col border border-gray-300 rounded-md shadow"
            style={{
              height: "75mm", // Slightly taller for better content spacing
              width: "60mm", // Increased width for better readability
            }}
          >
            {/* Top Half - Background Image */}
            <div className="relative w-full h-2/3">
              {data.subCamp === SubCamps.Iqbal && (
                <Image
                  src={IqbalCampSlipImage}
                  alt="Student Slip"
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              )}
              {data.subCamp === SubCamps.Jinnah && (
                <Image
                  src={JinnahCampSlipImage}
                  alt="Student Slip"
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              )}
              {data.subCamp === SubCamps.Liaqat && (
                <Image
                  src={LiaqatCampSlipImage}
                  alt="Student Slip"
                  layout="fill"
                  objectFit="contain"
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Bottom Half - Student Information */}
            <div className="w-full h-1/3 bg-white text-black p-2 space-y-1 text-[8px] leading-tight">
              <div>
                <strong>NAME:</strong> <span>{data.studentName}</span>
              </div>
              <div>
                <strong>FATHER&apos;S NAME:</strong>{" "}
                <span>{data.FatherName}</span>
              </div>
              <div>
                <strong>INSTITUTE:</strong> <span>{data.madrasaName}</span>
              </div>
              <div>
                <strong>SUB CAMP:</strong> <span>{data.subCamp}</span>
              </div>
              <div>
                <strong>CAMP NUMBER:</strong> <span>{data.camp}</span>
              </div>
              <div>
                <strong>GROUP:</strong> <span>{data.group}</span>
              </div>
              <div>
                <strong>ACTIVITY:</strong> <span>{data.activity}</span>
              </div>
            </div>

            {/* Footer Section */}
            <div
              className={`${
                data.subCamp === SubCamps.Jinnah && "bg-yellow-300"
              } ${data.subCamp === SubCamps.Iqbal && "bg-green-500"} ${
                data.subCamp === SubCamps.Liaqat && "bg-blue-800"
              } flex justify-center items-center text-white text-[7px] py-1`}
            >
              <h2 className="text-center">
                <span className="text-red-600 font-bold">Organized by:</span>{" "}
                Jamia Arabia Islamia
              </h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
);

const Drawer: React.FC<{
  isOpen: boolean;
  handleClose: () => void;
  rowData: any;
}> = ({ isOpen, handleClose, rowData }) => {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const userName = useSearchRole();
  const printRef = useRef<HTMLDivElement>(null);

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
      {rowData.status === STATUS.APPROVED && (
        <ReactToPrint
          trigger={() => (
            <Button
              variant="primary"
              size="lg"
              roundedness="md"
              className="px-8"
            >
              <IoPrintSharp className="h-6 w-6" />
              Print
            </Button>
          )}
          content={() => printRef.current}
        />
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
                <Avatar src={rowData.fileUrl} alt="Student Avatar" />
              </div>
            </div>
            {renderButton(rowData)}
          </div>
        </FlowbiteModal.Items>
      </FlowbiteModal>

      {/* Hidden print content */}
      <div style={{ display: "none" }}>
        <PrintContent ref={printRef} rowData={rowData} />
      </div>

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
