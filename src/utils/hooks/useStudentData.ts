import React, { useEffect, useState } from 'react'

interface Student {
    fatherName: string;
    fees: string;
    name: string;
    rollNumber: string;
    status: "Paid" | "Unpaid"; // Assuming the status can be either "Paid" or "Unpaid"
    feesStatus: any
  }
export const useStudentData = (setIsLoading:any, params: any) => {
    const [student, setStudent] = useState<Student>()
      useEffect(() => {
        const fetchStudent = async () => {
            try {
              setIsLoading(true);
              const response = await fetch(`/api/student/${params.id}`);
              const body = await response.json();
              setStudent(body);
            } catch (error) {
              console.error('Failed to fetch student:', error);
            } finally {
              setIsLoading(false); // Stop loading
            }
          };
          fetchStudent()
      }, [params.id, setIsLoading])

  return {student, setStudent}
}
