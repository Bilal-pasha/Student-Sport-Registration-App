"use client"
import { Button } from '@/components/Button/Button';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TableSkeleton } from '@/components/TableSkeleton/TabelSkeleton';
import StudentModal from '@/components/StudentModal/StudenModal';
import { getCurrentMonthYear } from '@/app/constant/constant';
import Navbar from '@/components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import { FaArrowLeft,FaPlus } from 'react-icons/fa'; // Import the icon
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface Student {
  fatherName: string;
  fees: string;
  name: string;
  rollNumber: string;
  id: Number;
  status: "Paid" | "Unpaid"; // Assuming the status can be either "Paid" or "Unpaid"
}
const tableHead = ['Name', "Father Name", "Roll Number", "Fees", "Status"]
const StudentTable = ({ params }: { params: { slug: string } }) => {
  const classSlug = params.slug;
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true)
  const router = useRouter()

  const handleEvent = async () => {
    try {
      const response = await fetch(`/api/class/${classSlug}/student`);
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
    {/* <Navbar/> */}
    <div className="container mx-auto">
      <div className='py-4 space-y-4'>
        <h1 className="text-2xl font-bold">Student Information</h1>
        {/* Button to open modal */}
        <div className='flex justify-between'>
        <Button onClick={ () => setIsModalOpen(true)} variant="primary" type="submit" size="md" className="!px-4">
          <FaPlus />
          Add New Student
        </Button>
        <Button 
          onClick={() => router.back()} 
          variant="primary" 
          type="button" 
          size="md" 
          className="!px-4 flex items-center gap-2" // Ensure proper spacing between icon and text
        >
          <FaArrowLeft /> {/* Add the icon */}
          Go Back
        </Button>
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        {tableLoading ? <TableSkeleton numberOfRows={18}/> : (

          <table className=" w-full border-collapse text-black rounded-full border-gray-400">
            <thead className=" text-left text-gray-600 uppercase text-sm border border-gray-400">
              <tr>
                {tableHead.map((value)=> (
                  <>
                  <th className="py-3 px-5 border-b border-slate-400">{value}</th>
                  </>
                ))}
              </tr>
            </thead>
          <tbody className="divide-y divide-gray-400">
            {students.map((student:any) => (
              <tr key={student?.id}>
                <td className="whitespace-nowrap font-medium text-gray-900 py-3 px-5 border-b border-gray-400 border-l">
                  <Link href={`/class/${classSlug}/students/${student?.id}`} className="text-blue-500 hover:underline">
                    {student?.name}
                  </Link>
                </td>
                <td className="py-3 px-5 border-b border-gray-400">{student.fatherName}</td>
                <td className="py-3 px-5 border-b border-gray-400">{student.rollNumber}</td>
                <td className="py-3 px-5 border-b border-gray-400">{student.fees}</td>
                <td className="py-3 px-5 border-b border-gray-400 border-r">
                {student.status === 'Paid' ? (
                <div className='flex font-medium text-xs'>
                  <span className="text-green-500 flex gap-x-1 rounded-md bg-green-100 py-1 px-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      {student.status} - {currentMonthYear}
                  </span>
                </div>
                ): (
                <div className='flex font-medium text-xs'>
                  <span className="text-red-600 flex items-center gap-x-1 bg-danger-300 py-1 px-2 rounded-md">
                    <XCircleIcon className="h-4 w-4 text-red-500" />
                    {student.status} - {currentMonthYear}
                  </span>
                </div>
                )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
         )}
      </div>

      {/* Modal */}
      {isModalOpen && <StudentModal setStudents={setStudents} students={students} setIsModalOpen={setIsModalOpen} classSlug={classSlug} create/>}
    </div>
    </>
  );
};

export default StudentTable;
