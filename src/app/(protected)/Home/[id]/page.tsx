"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AddNewStudentModal } from "@/components/AddNewStudentModal/AddNewStudentModal";
import useSearchRole from "@/hooks/useSearchRole/useSearchRole";
import { ROLE } from "@/constant/constant";
import { Button } from "@/components/Button/Button";
import { UpdateStudentModal } from "@/components/UpdateStudentModal/UpdateStudentModal";

interface Student {
  studentName: string;
  FatherName: string;
  rollNumber: number;
  age: number;
  grade: string;
  TshirtSize: string;
  activity: string;
}

const StudentTable = ({ params }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null); // State for selected student

  const userName = useSearchRole();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/madrasas/${params.id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setStudents(data.students);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load students");
        setLoading(false);
      }
    };

    if (session && params.id) {
      fetchStudents();
    }
  }, [params.id, session, isModalOpen]);

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }

  const tableHead = students.length > 0 ? Object.keys(students[0]) : [];
  
  const handleUpdateButton = (rowData: Student) => {
    setSelectedStudent(rowData); // Set the selected student data
    setUpdateModalOpen(true);
  };

  return (
    <>
      <div className="mt-10 container mx-auto">
        <Button
          onClick={() => setModalOpen(true)}
          variant={"primary"}
          size={"lg"}
          className="mb-4"
        >
          Add New Student
        </Button>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Students List
        </h2>
        {students.length === 0 ? (
          <div className="text-center text-gray-200">No students found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg border bg-gray-300 border-black">
              <thead>
                <tr>
                  {tableHead.map((thead, index) => (
                    <th
                      key={index}
                      className="py-3 px-5 border-b border-gray-400"
                    >
                      {thead}
                    </th>
                  ))}
                  {userName === ROLE.ADMIN && (
                    <th className="py-3 px-5 border-b border-gray-400">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student: any, index: number) => (
                  <tr key={student.rollNumber + index} className="border-t border-black">
                    {tableHead.map((head: string, index: number) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap">
                        {student[head]}
                      </td>
                    ))}
                    {userName === ROLE.ADMIN && (
                      <td className="py-3 px-5 border-b border-gray-400">
                        <Button
                          variant={"primary"}
                          size={"sm"}
                          onClick={() => handleUpdateButton(student)} // Pass student data here
                        >
                          Update
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isModalOpen && (
          <AddNewStudentModal
            setModalOpen={setModalOpen}
            madrasaId={params.id}
          />
        )}
        {isUpdateModalOpen && (
          <UpdateStudentModal
            setModalOpen={setUpdateModalOpen}
            madrasaId={params.id}
            student={selectedStudent} // Pass the selected student data to the modal
          />
        )}
      </div>
    </>
  );
};

export default StudentTable;
