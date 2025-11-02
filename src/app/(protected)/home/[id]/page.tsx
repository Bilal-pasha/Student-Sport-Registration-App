"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AddNewStudentModal } from "@/components/AddNewStudentModal/AddNewStudentModal";
import { Button } from "@/components/Button/Button";
import Drawer from "@/components/Drawer/Drawer";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";
import { IoPrintSharp } from "react-icons/io5";
import ReactToPrint from "react-to-print";
import { STATUS, SubCamps } from "@/constant/constant";
import Image from "next/image";
import IqbalCampSlipImage from "/public/assets/iqbalCamp.jpeg";
import JinnahCampSlipImage from "/public/assets/jinnahCamp.jpeg";
import LiaqatCampSlipImage from "/public/assets/liaqatCamp.jpeg";

interface Student {
  studentName: string;
  FatherName: string;
  madrasaName: string;
  age: number;
  grade: string;
  TshirtSize: string;
  activity: string;
  rollNumber: string;
}
// eslint-disable-next-line react/display-name
const PrintContent = React.forwardRef<HTMLDivElement, { students: any }>(
  ({ students }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full h-full print-page grid grid-cols-3 gap-12 p-2"
        style={{
          height: "300mm", // A4 height
          width: "230mm", // A4 width
          boxSizing: "border-box",
        }}
      >
        {students.map((student: any, index: number) =>
          student.status === STATUS.APPROVED ? (
            <div
              key={index}
              className="flex flex-col border border-gray-200 rounded-md shadow"
              style={{
                height: "95mm", // Increased height from 90mm
                width: "60mm", // Adjusted width remains the same
                pageBreakInside: "avoid", // Prevent splitting across pages
              }}
            >
              {/* Top Half - Background Image */}
              <div className="relative w-full h-3/5"> {/* Adjusted height proportion */}
                {student.subCamp === SubCamps.Iqbal && (
                  <Image
                    src={IqbalCampSlipImage}
                    alt="Student Slip"
                    layout="fill"
                    objectFit="cover" // Ensures the image covers the container
                    objectPosition="center" // Keeps the image centered, preventing cropping from top and bottom
                    className="w-full h-full"
                  />
                )}
                {student.subCamp === SubCamps.Jinnah && (
                  <Image
                    src={JinnahCampSlipImage}
                    alt="Student Slip"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="w-full h-full"
                  />
                )}
                {student.subCamp === SubCamps.Liaqat && (
                  <Image
                    src={LiaqatCampSlipImage}
                    alt="Student Slip"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Bottom Half - Student Information */}
              <div className="w-full h-2/5 p-2 space-y-2 text-[8px] text-black leading-tight">
                <div>
                  <strong>NAME:</strong> <span>{student.studentName}</span>
                </div>
                <div>
                  <strong>FATHER&apos;S NAME:</strong>{" "}
                  <span>{student.FatherName}</span>
                </div>
                <div>
                  <strong>INSTITUTE:</strong> <span>{student.madrasaName}</span>
                </div>
                <div>
                  <strong>SUB CAMP:</strong> <span>{student.subCamp}</span>
                </div>
                <div>
                  <strong>CAMP NUMBER:</strong> <span>{student.camp}</span>
                </div>
                <div>
                  <strong>GROUP:</strong> <span>{student.group}</span>
                </div>
                <div>
                  <strong>ACTIVITY:</strong>{" "}
                  <span className="whitespace-normal break-words">
                    {student.activity}
                  </span>
                </div>
              </div>

              {/* Footer Section */}
              <div
                className={`${
                  student.subCamp === SubCamps.Jinnah && "bg-yellow-300"
                } ${student.subCamp === SubCamps.Iqbal && "bg-green-500"} ${
                  student.subCamp === SubCamps.Liaqat && "bg-blue-800"
                } flex justify-center items-center text-white text-[10px] py-1`}
              >
                <h2 className="text-center font-black">
                  <span className="text-red-600 font-bold">Organized by:</span>{" "}
                  Jamia Arabia Islamia
                </h2>
              </div>
            </div>
          ) : null
        )}
      </div>
    );
  }
);




const StudentTable = ({ params }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/madrasas/${params.id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setStudents(data.students);
      } catch (error) {
        toast.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    if (session && params.id) {
      fetchStudents();
    }
  }, [params.id, session, isModalOpen, isDrawerOpen]);

  const handleRowClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDrawerOpen(true);
  };

  const handleClose = () => setIsDrawerOpen(false);
  const printRef = useRef<HTMLDivElement>(null);
  console.log(students);
  return (
    <>
      <div className="mt-10 container mx-auto">
        <div className="flex justify-between">
          <div>
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              size="lg"
              className="mb-4"
            >
              Add New Student
            </Button>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">
              Students List
            </h2>
          </div>
          <ReactToPrint
            trigger={() => (
              <Button
                variant="primary"
                size="lg"
                roundedness="md"
                className="px-8"
              >
                <IoPrintSharp className="h-6 w-6" />
                Print All Approved Students Card
              </Button>
            )}
            content={() => printRef.current}
          />
        </div>
        {loading ? (
          <TableSkeleton numberOfRows={6} />
        ) : students.length === 0 ? (
          <div className="text-center text-gray-600">No students found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg bg-white border border-green-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    No#
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Student Name
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Father Name
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Madrasa Name
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Level
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    T-Shirt Size
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Activity
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Grade
                  </th>
                  <th className="py-3 px-5 border-b border-green-300 text-left">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green-100">
                {students.map((student, index) => (
                  <tr
                    key={index}
                    className="border-t border-black cursor-pointer"
                    onClick={() => handleRowClick(student)}
                  >
                    <td className="px-6 py-4 border-l border-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.studentName}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.FatherName}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.madrasaName ?? ""}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.grade}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.TshirtSize}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.activity}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.grade}
                    </td>
                    <td className="px-6 py-4 border-l border-gray-400">
                      {student.age}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ display: "none" }}>
          <PrintContent ref={printRef} students={students} />
        </div>
        {isModalOpen && (
          <AddNewStudentModal
            setModalOpen={setModalOpen}
            madrasaId={params.id}
          />
        )}
      </div>
      <Drawer
        isOpen={isDrawerOpen}
        handleClose={handleClose}
        rowData={selectedStudent}
      />
    </>
  );
};

export default StudentTable;
