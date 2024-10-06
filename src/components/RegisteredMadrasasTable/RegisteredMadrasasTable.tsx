import React, { useEffect, useState } from 'react';
import { TableSkeleton } from '../TableSkeleton/TabelSkeleton';
import { useSession } from 'next-auth/react';
interface Madrasa {
  id: string;
  madrasaName: string;
  madrasaAddress: string;
  totalStudents: number;
  createdAt: string;
}

const MadrasaTable: React.FC = () => {
  const [madrasas, setMadrasas] = useState<Madrasa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchMadrasas = async () => {
      try {
        const response = await fetch(`/api/get-madrasa/${session?.user?.email}`);
        const resData = await response.json();
        if (response.ok) {
          setMadrasas(resData.data);
        } else {
          console.error('Failed to fetch madrasas');
        }
      } catch (error) {
        console.error('Error fetching madrasas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMadrasas();
  }, []);

  if (loading) {
    return <TableSkeleton numberOfRows={18}/>;
  }

  const tableHead = ['Madrasa Name', 'Madrasa Address', 'Total Students', 'Registered On'];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-black rounded-full border-gray-400">
        <thead className="text-left text-gray-600 uppercase text-sm border border-gray-400">
          <tr>
            {tableHead.map((value, index) => (
              <th key={index} className="py-3 px-5 border-b border-slate-400">
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-400">
          {madrasas.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-3 px-5 text-center">
                No madrasas found
              </td>
            </tr>
          ) : (
            madrasas?.map((madrasa) => (
              <tr key={madrasa.id}>
                <td className="whitespace-nowrap font-medium text-gray-900 py-3 px-5 border-b border-gray-400 border-l">
                  {madrasa.madrasaName}
                </td>
                <td className="py-3 px-5 border-b border-gray-400">
                  {madrasa.madrasaAddress}
                </td>
                <td className="py-3 px-5 border-b border-gray-400">
                  {madrasa.totalStudents}
                </td>
                <td className="py-3 px-5 border-b border-gray-400 border-r">
                  {new Date(madrasa.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MadrasaTable;
