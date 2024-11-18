import React, { useReducer } from "react";
import { Button } from "@/components/Button/Button";

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
  appliedFilters: TfilterValues;
  filteredData: ApiResponse;
  loading: boolean;
  error: string | null;
}

// Define the action types
type Action =
  | { type: "SET_FILTER_VALUE"; filter: keyof TfilterValues; value: string }
  | { type: "APPLY_FILTERS" }
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

export const Filter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const filters: (keyof TfilterValues)[] = [
    "status",
    "subCamp",
    "campNumber",
    "activity",
    "age",
    "madrasa",
  ];

  // Handle input field changes
  const handleInputChange = (filter: keyof TfilterValues, value: string) => {
    dispatch({
      type: "SET_FILTER_VALUE",
      filter,
      value: value,
    });
  };

  // Handle Apply button click
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

      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }

      const data: ApiResponse = await response.json();
      dispatch({ type: "SET_FILTERED_DATA", data: data.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", error: "Error fetching filtered data" });
      console.error(err);
    } finally {
      dispatch({ type: "SET_LOADING", loading: false });
    }
  };
  const columnDisplayNames: { [key: string]: string } = {
    No: "No#",
    studentName: "Student Name",
    FatherName: "Father Name",
    age: "Age",
    status: "Status",
    activity: "Activity",
    group: "Group",
    camp: "Camp Number", // Change the display name for "camp"
    subCamp: "Sub Camp",
  };
  // Columns to display in the table
  const tableColumns = [
    "No",
    "studentName",
    "FatherName",
    "age",
    "status",
    "activity",
    "group",
    "camp",
    "subCamp",
  ];

  return (
    <div className="flex flex-col justify-center items-end px-4 space-x-4">
      {/* Filter Button */}
      <div className="relative inline-block text-left">
        <button
          onClick={() =>
            dispatch({ type: "SET_LOADING", loading: !state.loading })
          }
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none z-10"
        >
          Filters
        </button>
        {/* Filter Dropdown */}
        {state.loading && (
          <div className="absolute right-0 mt-2 w-96 py-2 bg-white rounded-md shadow-lg z-20">
            <div className="p-4 space-y-4">
              {filters.map((filter, index) => (
                <div key={index} className="flex flex-col space-y-1">
                  <label
                    htmlFor={filter}
                    className="text-sm font-medium text-gray-700"
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </label>
                  <input
                    type={filter === "age" ? "number" : "text"}
                    id={filter}
                    value={state.filterValues[filter]}
                    onChange={(e) => handleInputChange(filter, e.target.value)}
                    placeholder={`Enter ${
                      filter.charAt(0).toUpperCase() + filter.slice(1)
                    }`}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="py-1 px-2 flex justify-end">
              <Button
                variant={"primary"}
                size={"sm"}
                onClick={handleApplyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Loading or Error State */}
      {state.error && (
        <div className="mt-4 text-sm text-red-500">{state.error}</div>
      )}

      {/* Display Filtered Data */}
      <div className="mt-4 w-full">
        {state.filteredData.data.length > 0 ? (
          <div>
            <table className="w-full bg-white shadow-md rounded-md ">
              <thead className="bg-[#714620fa] text-white text-sm uppercase ">
                <tr>
                  {tableColumns.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 text-sm font-semibold border-b text-start"
                    >
                      {columnDisplayNames[col] || col}{" "}
                      {/* Use the display name */}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {state.filteredData.data.map((student, index) => (
                  <tr key={index}>
                    {tableColumns.map((col) => (
                      <td key={col} className="px-4 py-2 text-sm text-gray-800">
                        {col === "No"
                          ? index + 1
                          : student[col as keyof StudentData]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-sm text-gray-200 text-center">
            No filtered data available.
          </div>
        )}
      </div>
    </div>
  );
};
