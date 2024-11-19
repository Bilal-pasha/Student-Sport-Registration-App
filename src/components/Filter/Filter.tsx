import React, { useEffect, useReducer, useRef, useMemo } from "react";
import { Button } from "@/components/Button/Button";
import ReactToPrint from "react-to-print";
import { IoPrintSharp } from "react-icons/io5";
import Image from "next/image";

// Define the types for the filter values
interface TfilterValues {
  status: string;
  subCamp: string;
  campNumber: string;
  activity: string;
  age: number;
  madrasa: string;
}

// Define the type for a single student object (filtered data item)
interface StudentData {
  _id: string;
  madrasaId: string;
  studentName: string;
  madrasaName: string;
  FatherName: string;
  age: number;
  grade: string;
  TshirtSize: string;
  status: string;
  activity: string;
  fileUrl: string;
  createdAt: string;
  camp: string;
  group: string;
  report: string;
  subCamp: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: StudentData[];
}

// Define the state type
interface State {
  filterValues: TfilterValues;
  madrasaList: string[]; // List of madrasa names
  appliedFilters: TfilterValues;
  filteredData: ApiResponse;
  madrasaName: string[]; // List of madrasa names (used for filters)
  loading: boolean;
  error: string | null;
}

// Define the action types
type Action =
  | { type: "SET_FILTER_VALUE"; filter: keyof TfilterValues; value: string }
  | { type: "APPLY_FILTERS" }
  | { type: "SET_MADRASA_LIST"; data: string[] }
  | { type: "SET_FILTERED_DATA"; data: StudentData[] }
  | { type: "SET_LOADING"; loading: boolean }
  | { type: "SET_ERROR"; error: string };

// Initial state
const initialState: State = {
  filterValues: {
    status: "",
    subCamp: "",
    campNumber: "",
    activity: "",
    age: 0,
    madrasa: "",
  },
  appliedFilters: {
    status: "",
    subCamp: "",
    campNumber: "",
    activity: "",
    age: 0,
    madrasa: "",
  },
  madrasaList: [],
  madrasaName: [],
  filteredData: { success: false, data: [] },
  loading: false,
  error: null,
};

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FILTER_VALUE":
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          [action.filter]: action.value,
        },
      };
    case "APPLY_FILTERS":
      return {
        ...state,
        appliedFilters: state.filterValues,
      };
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: { success: true, data: action.data },
      };
    case "SET_MADRASA_LIST":
      return {
        ...state,
        madrasaList: action.data,
        madrasaName: action.data,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

// PrintContent Component
// eslint-disable-next-line react/display-name
const PrintContent = React.forwardRef<HTMLDivElement, { data: StudentData[] }>(({ data }, ref) => (
  <div ref={ref}>
    <div className="flex items-center justify-evenly space-x-4 py-3">
      <Image src="/assets/signinLogo.png" alt="Sign In Logo" width={200} height={200} className="object-contain" />
      <Image src="/assets/JamiaArabiaLogo.png" alt="Jamia Arabia Logo" width={200} height={200} className="object-contain" />
    </div>
    <table className="w-full bg-white shadow-md rounded-md border-collapse border border-gray-300">
      <thead className="bg-gray-300 text-black text-xs uppercase">
        <tr>
          {["No#", "Name", "Father Name", "Madrasa Name", "Age", "Status", "Activity", "Group", "Camp Number", "Sub Camp"].map((header, index) => (
            <th key={index} className="px-4 py-2 text-xs font-semibold border-b border-gray-300 text-start">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((student, index) => (
          <tr key={student._id} className="border-t border-gray-300">
            {[
              index + 1,
              student.studentName,
              student.FatherName,
              student.madrasaName,
              student.age,
              student.status,
              student.activity,
              student.group,
              student.camp,
              student.subCamp,
            ].map((value, index) => (
              <td key={index} className="px-4 py-2 text-xs text-gray-800 border-r border-gray-300">
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));

export const Filter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const printRef = useRef<HTMLDivElement>(null);

  // Memoize the fetch function for madrasa names
  const fetchMadrasaNames = useMemo(() => {
    return async () => {
      try {
        const response = await fetch("/api/register-madrasa");
        const result = await response.json();
        if (result.success) {
          dispatch({ type: "SET_MADRASA_LIST", data: result.data });
        }
      } catch (error: any) {
        dispatch({ type: "SET_ERROR", error: "Failed to fetch madrasa names" });
      }
    };
  }, []);

  // Fetch madrasa names once when the component mounts
  useEffect(() => {
    fetchMadrasaNames();
  }, [fetchMadrasaNames]);

  const filters: (keyof TfilterValues)[] = ["status", "subCamp", "campNumber", "activity", "age", "madrasa"];

  const handleInputChange = (filter: keyof TfilterValues, value: string) => {
    dispatch({ type: "SET_FILTER_VALUE", filter, value });
  };

  const handleApplyFilters = async () => {
    dispatch({ type: "APPLY_FILTERS" });
    dispatch({ type: "SET_LOADING", loading: true });

    try {
      const response = await fetch("/api/filtered-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state.filterValues),
      });

      if (!response.ok) throw new Error("Failed to fetch filtered data");

      const data: ApiResponse = await response.json();
      dispatch({ type: "SET_FILTERED_DATA", data: data.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", error: "Error fetching filtered data" });
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };

  // Static filter options
  const campNumberOptions = Array.from({ length: 50 }, (_, index) => `Camp ${index + 1}`);
  const activityOptions = [
    "First Aid", "Traffic Police", "Rally Police", "Civil Defence", "Football", "Volleyball", "Spoon Race", "100 Meter Race", "Tug of War",
  ];
  const subCampOptions = ["Iqbal", "Jinnah", "Liaqat"];
  const statusOptions = ["Approved"];

  return (
    <div className="flex flex-col justify-center items-end px-4 space-x-4">
      {/* Filter Button */}
      <div className="relative inline-block text-left">
        <div className="flex space-x-5">
          <ReactToPrint
            trigger={() => <Button variant="primary" size="md" roundedness="md" className="px-8"><IoPrintSharp className="h-6 w-6" /> Print</Button>}
            content={() => printRef.current}
          />
          <Button
            variant="primary"
            size="md"
            roundedness="md"
            className="px-8"
            onClick={() => dispatch({ type: "SET_LOADING", loading: !state.loading })}
          >
            Filters
          </Button>
        </div>

        {/* Filter Inputs */}
        {state.loading && (
          <div className="absolute right-0 mt-2 w-96 py-2 bg-white rounded-md shadow-lg z-20">
            <div className="p-4 space-y-4">
              {filters.map((filter) => (
                <div key={filter} className="flex flex-col space-y-1">
                  <label htmlFor={filter} className="text-sm font-medium text-gray-700">
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </label>
                  {filter === "age" && (
                    <input
                      type="number"
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      placeholder={`Enter ${filter}`}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                  {filter === "subCamp" && (
                    <select
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Sub Camp</option>
                      {subCampOptions.map((subCamp, index) => (
                        <option key={index} value={subCamp}>{subCamp}</option>
                      ))}
                    </select>
                  )}
                  {filter === "status" && (
                    <select
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                      ))}
                    </select>
                  )}
                  {filter === "activity" && (
                    <select
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Activity</option>
                      {activityOptions.map((activity, index) => (
                        <option key={index} value={activity}>{activity}</option>
                      ))}
                    </select>
                  )}
                  {filter === "madrasa" && (
                    <select
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Madrasa</option>
                      {state.madrasaName.map((madrasa, index) => (
                        <option key={index} value={madrasa}>{madrasa}</option>
                      ))}
                    </select>
                  )}
                  {filter === "campNumber" && (
                    <select
                      id={filter}
                      value={state.filterValues[filter]}
                      onChange={(e) => handleInputChange(filter, e.target.value)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Camp Number</option>
                      {campNumberOptions.map((camp, index) => (
                        <option key={index} value={camp}>{camp}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
            <div className="py-1 px-2 space-x-4 flex justify-end">
              <Button variant="primary" size="md" onClick={handleApplyFilters} className="px-4">Apply</Button>
              <Button variant="danger" size="md" onClick={() => dispatch({ type: "SET_LOADING", loading: false })} className="px-4">Cancel</Button>
            </div>
          </div>
        )}
      </div>

      {/* Error or Loading State */}
      {state.error && <div className="mt-4 text-sm text-red-500">{state.error}</div>}

      {/* Display Filtered Data */}
      <div className="mt-4 w-full">
        {state.filteredData.data.length > 0 ? (
          <table className="w-full bg-white shadow-md rounded-md">
            <thead className="bg-[#714620fa] text-white text-sm uppercase">
              <tr>
                {["No#", "Student Name", "Father Name", "Madrasa Name", "Age", "Status", "Activity", "Group", "Camp Number", "Sub Camp"].map((header, index) => (
                  <th key={index} className="px-4 py-2 text-sm font-semibold border-b text-start">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {state.filteredData.data.map((student, index) => (
                <tr key={student._id}>
                  {[
                    index + 1,
                    student.studentName,
                    student.FatherName,
                    student.madrasaName,
                    student.age,
                    student.status,
                    student.activity,
                    student.group,
                    student.camp,
                    student.subCamp,
                  ].map((value, index) => (
                    <td key={index} className="px-4 py-2 text-sm text-gray-800">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-sm text-gray-200 text-center">No filtered data available.</div>
        )}
      </div>

      {/* Hidden Print Content */}
      <div style={{ display: "none" }}>
        <PrintContent ref={printRef} data={state.filteredData.data} />
      </div>
    </div>
  );
};
