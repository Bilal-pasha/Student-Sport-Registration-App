"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button/Button";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal/Modal";
import toast from "react-hot-toast";
import { TableSkeleton } from "@/components/TableSkeleton/TabelSkeleton";
import { getCurrentMonthYear } from "@/app/constant/constant";
import StudentModal from "@/components/StudentModal/StudenModal";
interface Student {
    fatherName: string;
    fees: string;
    name: string;
    rollNumber: string;
    status: "Paid" | "Unpaid"; // Assuming the status can be either "Paid" or "Unpaid"
  }
 
export default function Page({params}: any) {
    const [student, setStudent] = useState<Student>()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [modal , setModal] = useState(false)
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [students, setStudents] = useState([]);
    const router = useRouter()

    const fetchStudent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/student/${params.id}`);
        const body = await response.json();
        console.log(body);
        setStudent(body);
      } catch (error) {
        console.error('Failed to fetch student:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    
    useEffect(() => {
        fetchStudent()
    }, [])
    console.log(student)

    const handleDeleteButton = async (studentId: string) => {
        setModal(true)
        try {
          const res = await fetch(`/api/student/${studentId}`, {
            method: 'DELETE',
          });
          const data = await res.json()
          if(data.delete){
            router.back()
            toast.success("Student Deleted Successfully")
          }
          
        } catch (error) {
          console.error('Error deleting student:', error);
          toast.error("Something went wrong")
        }
      };
      const closeModal = () => {
        setModal(false);
      };
      const currentMonthYear = getCurrentMonthYear();

 return (
   <div className="container mx-auto py-10">
    <>{isLoading ? (<TableSkeleton numberOfRows={10}/>) : (
      <>
          <div className="border-b border-gray-200 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Student&apos; Name</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.name}</p>
          </div>
          <div className="border-b border-gray-200 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Father&apos; Name</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.fatherName}</p>
          </div>
          <div className="border-b border-gray-200 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Roll Number</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.rollNumber}</p>
          </div>
          <div className="border-b border-gray-200 mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Fees</h2>
              <p className="text-lg text-gray-700 py-2 px-4">{student?.fees}</p>
          </div>
          <div className={`border-b border-gray-200 mb-4 flex items-center justify-between ${student?.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
              <h2 className="text-xl font-semibold text-gray-800">Status</h2>
              <p className={`text-lg py-2 px-4 ${student?.status === "Paid" ? "text-green-600" : "text-red-600"}`}>
              {student?.status} - {currentMonthYear}
              </p>
          </div>
          <div className="flex justify-between">
              <div></div>
              <div className="flex space-x-4">
              <Button variant="primary" size="md" className="!px-4" onClick={() => setUpdateModal(true)}>Update</Button>
              <Button variant="danger" size="md" className="!px-4" onClick={() => setModal(true)}>Delete</Button>
              </div>
          </div>
      {updateModal && <StudentModal setStudents={setStudents} students={students} setIsModalOpen={setUpdateModal} id={params.id}/>}
      {modal && <Modal closeModal={closeModal} handleFunction={handleDeleteButton} id={params.id} name={student?.name}/>}
      </>
    ) }
     </>
    </div>
 )
}