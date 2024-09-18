"use client"
import { Button } from '@/components/Button/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TableSkeleton } from '@/components/TableSkeleton/TabelSkeleton';
import StudentModal from '@/components/StudentModal/StudenModal';
import { getCurrentMonthYear } from '@/app/constant/constant';
import Navbar from '@/components/Navbar/Navbar';

interface Student {
  fatherName: string;
  fees: string;
  name: string;
  rollNumber: string;
  id: Number;
  status: "Paid" | "Unpaid"; // Assuming the status can be either "Paid" or "Unpaid"
}
const tableHead = ['Name', "Father Name", "Roll Number", "Fees", "Status"]
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true)

  const handleEvent = async () => {
    try {
      const response = await fetch("/api/add");
      const res = await response.json();
      setStudents(res);
      setTableLoading(false)

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
  handleEvent();
  },[])
  
  const currentMonthYear = getCurrentMonthYear();
  return (
    <>
    <Navbar/>
    <div className="container mx-auto">
      <div className='py-4 space-y-4'>
        <h1 className="text-2xl font-bold">Student Information</h1>
        {/* Button to open modal */}
        <Button onClick={ () => setIsModalOpen(true)} variant="primary" type="submit" size="md" className="!px-4">
          Add New Student
        </Button>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        {tableLoading ? <TableSkeleton numberOfRows={18}/> : (

          <table className="border border-slate-00 w-full border-collapse text-black">
            <thead className="bg-gray-300 text-left text-gray-600 uppercase text-sm">
              <tr>
                {tableHead.map((value)=> (
                  <>
                  <th className="py-3 px-5 border-b border-slate-400">{value}</th>
                  </>
                ))}
              </tr>
            </thead>
          <tbody className="divide-y divide-slate-400">
            {students.map((student:any) => (
              <tr className="bg-slate-200 hover:bg-gray-100" key={student?.id}>
                <td className="whitespace-nowrap font-medium text-gray-900 py-3 px-5 border-b border-slate-400">
                  <Link href={`/students/${student?.id}`} className="text-blue-500 hover:underline">
                    {student?.name}
                  </Link>
                </td>
                <td className="py-3 px-5 border-b border-slate-400">{student.fatherName}</td>
                <td className="py-3 px-5 border-b border-slate-400">{student.rollNumber}</td>
                <td className="py-3 px-5 border-b border-slate-400">{student.fees}</td>
                <td className={`py-3 px-2 border-b border-slate-400 ${student.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                  {student.status} - {currentMonthYear}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
         )}
      </div>

      {/* Modal */}
      {isModalOpen && <StudentModal setStudents={setStudents} students={students} setIsModalOpen={setIsModalOpen} create/>}
    </div>
    </>
  );
};

export default StudentTable;
