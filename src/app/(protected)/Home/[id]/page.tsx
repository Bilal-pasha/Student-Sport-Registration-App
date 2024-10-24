"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AddNewStudentModal } from "@/components/AddNewStudentModal/AddNewStudentModal";
import { Button } from "@/components/Button/Button";
import Drawer from "@/components/Drawer/Drawer";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";

interface Student {
  studentName: string;
  FatherName: string;
  age: number;
  grade: string;
  TshirtSize: string;
  activity: string;
  rollNumber: string;
}

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

  return (
    <>
      <div className="mt-10 container mx-auto">
        <Button
          onClick={() => setModalOpen(true)}
          variant="primary"
          size="lg"
          className="mb-4"
        >
          Add New Student
        </Button>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Students List</h2>
        
        {loading ? (
          <TableSkeleton numberOfRows={6} />
        ) : students.length === 0 ? (
          <div className="text-center text-gray-200">No students found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full shadow-md rounded-lg bg-gray-300">
              <thead className="bg-[#714620fa] text-white">
                <tr>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Student Name</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Father Name</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Level</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">T-Shirt Size</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Activity</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Grade</th>
                  <th className="py-3 px-5 border-b border-gray-400 text-left">Age</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student, index) => (
                  <tr key={student.rollNumber + index} className="border-t border-black cursor-pointer" onClick={() => handleRowClick(student)}>
                    <td className="px-6 py-4">{student.studentName}</td>
                    <td className="px-6 py-4">{student.FatherName}</td>
                    <td className="px-6 py-4">{student.grade}</td>
                    <td className="px-6 py-4">{student.TshirtSize}</td>
                    <td className="px-6 py-4">{student.activity}</td>
                    <td className="px-6 py-4">{student.grade}</td>
                    <td className="px-6 py-4">{student.age}</td>
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
      </div>
      <Drawer isOpen={isDrawerOpen} handleClose={handleClose} rowData={selectedStudent} />
    </>
  );
};

export default StudentTable;
