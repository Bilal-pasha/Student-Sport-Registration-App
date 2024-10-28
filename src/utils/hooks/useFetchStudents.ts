import { useEffect, useState } from 'react'

 const useFetchStudents = (classSlug : any, setTableLoading: any) => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
          try {
            const response = await fetch(`/api/class/${classSlug}/student`);
            const res = await response.json();
            setStudents(res);
            setTableLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchStudents();
      }, [classSlug, setTableLoading]);
      return {students, setStudents}
}
export default useFetchStudents