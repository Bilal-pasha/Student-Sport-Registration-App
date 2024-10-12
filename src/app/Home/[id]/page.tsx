"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {AddNewStudentModal} from '@/components/AddNewStudentModal/AddNewStudentModal'; // Fixed import

interface Student {
  studentName: string;
  fatherName: string;
  rollNumber: number;
  age: number;
  grade: string;
}

const StudentTable = ({ params }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`/api/madrasas/${params.id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setStudents(data.students);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load students');
        setLoading(false);
      }
    };

    if (session && params.id) {
      fetchStudents();
    }
  }, [params.id, session]);

  if (loading) {
    return <div className="text-center text-blue-600">Loading...</div>;
  }


  return (
    <>
      <div className="mt-10 container mx-auto">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4"
        >
          Add New Student
        </button>
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Students List</h2>
        {students.length === 0 ? (
            <div className="text-center text-gray-200">No students found</div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md rounded-lg border bg-gray-300 border-black">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.rollNumber} className="border-t border-black">
                  <td className="px-6 py-4 whitespace-nowrap">{student.rollNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.studentName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.fatherName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
        {isModalOpen && <AddNewStudentModal setModalOpen={setModalOpen} madrasaId={params.id} />}
      </div>
    </>
  );
};

export default StudentTable;
