"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";
import StudentModal from "@/components/StudentModal/StudenModal";
import { FaArrowLeft } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';
import Invoice from "@/components/Invoice/Invoice";
import { FaPrint, FaTrash, FaEdit } from 'react-icons/fa';
import { useStudentData } from "@/utils/hooks/useStudentData";
  
export default function Page({params}: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modal , setModal] = useState(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [students, setStudents] = useState([]);
    const router = useRouter();
    const invoiceRef = useRef(null);
    const {student, setStudent} = useStudentData(setIsLoading,params);
    const handleDeleteButton = async (studentId: string) => {
        setModal(true)
        try {
          const res = await fetch(`/api/student/${studentId}`, {
            method: 'DELETE',
          });
          const data = await res.json()
          if(data.delete){
            router.back()
            toast.success(data?.message)
          }
          
        } catch (error: any) {
          toast.error(error?.message)
        }
      };
      const closeModal = () => {
        setModal(false);
      };
      const handlePrint = useReactToPrint({
        content: () => invoiceRef.current,
      });
      
        return (
          <>
           <div className="flex justify-end px-10">
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
    <div className="container mx-auto py-10">
    <>{isLoading ? (<TableSkeleton numberOfRows={10}/>) : (
      <>
          <div className="border-b border-gray-400 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Student&apos; Name</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.name}</p>
          </div>
          <div className="border-b border-gray-400 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Father&apos; Name</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.fatherName}</p>
          </div>
          <div className="border-b border-gray-400 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">ID Number</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.rollNumber}</p>
          </div>
          <div className="border-b border-gray-400 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Fees</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.fees}</p>
          </div>
          <div className={`border-b border-gray-400 mb-4`}>
          <div className="grid mb-4 grid-cols-3 items">
            <h2 className="text-xl font-semibold text-gray-800 col-span-1">Status</h2>
            <div className=" gap-2 mt-2 space-y-2 space-x-4 col-span-2">
              {student?.feesStatus?.map((m: any, index: number) => (
                <span
                  key={m.month + index}
                  className={`inline-block py-2 px-4 rounded-lg text-sm font-semibold 
                    ${m.status === "Paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                >
                  {m.month} - {m.status}
                </span>
              ))}
            </div>
            </div>
          </div>
          <div className="flex justify-between">
              <div></div>
              <div className="flex space-x-4">
              <Button variant="primary" size="md" onClick={handlePrint}>
                <FaPrint className="inline-block mr-2 w-5 h-5" />
                Print Invoice
              </Button>
              <Button variant="primary" size="md" className="!px-4" onClick={() => setUpdateModal(true)}>
                <FaEdit className="inline-block mr-2 w-5 h-5" />
                Update
              </Button>
              <Button variant="danger" size="md" className="!px-4" onClick={() => setModal(true)}>
                <FaTrash className="inline-block mr-2 w-5 h-5" />
                Delete
              </Button>
              </div>
          </div>
      {updateModal && <StudentModal setStudents={setStudents} students={students} setIsModalOpen={setUpdateModal} id={params.id} studentData={student} setStudent={setStudent}/>}
      {modal && <Modal closeModal={closeModal} handleFunction={handleDeleteButton} id={params.id} name={student?.name}/>}
      <Invoice ref={invoiceRef} student={student} />
      </>
    ) }
     </>
    </div>
    </>
 )
}