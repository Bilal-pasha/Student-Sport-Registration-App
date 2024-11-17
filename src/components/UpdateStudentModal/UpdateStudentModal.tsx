"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import { validationSchema } from "./validationSchema";
import { SubCamps } from "@/constant/constant";

export const UpdateStudentModal = ({
  setModalOpen,
  // madrasaId,
  student,
  handleClose,
}: any) => {
  // Initial form values
  const initialValues = {
    studentName: student.studentName,
    FatherName: student.FatherName,
    age: student.age,
    grade: student.grade,
    TshirtSize: student.TshirtSize,
    activity: student.activity,
    status: student.status || "", // New field for status
    group: student.group || "", // New field for group
    camp: student.camp || "", // New field for camp
    subCamp: student.subCamp || "", // New field for sub-camp
    report: student.report || "", // New field for student report
  };

  // List of activities
  const activities = [
    "First Aid",
    "Traffic Police",
    "Rally Police",
    "Civil Defence",
    "Football",
    "Volleyball",
    "Spoon Race",
    "100 Meter Race",
    "Tug of War",
  ];

  // Status options
  const statuses = ["Approved", "Rejected"];

  // Group options
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

  // Camp options

  // Sub-camp options
  const campNo = Array.from({ length: 50 }, (_, i) => `Camp ${i + 1}`);
  const subCamps = [SubCamps.Iqbal, SubCamps.Jinnah, SubCamps.Liaqat];
  // Form validation schema

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    const payload = {
      ...values,
      madrasaId: student.madrasaId,
      studentId: student._id, // Ensure you're passing the student ID
    };

    try {
      const response = await fetch("/api/update-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setModalOpen(false); // Close the modal after successful submission
      handleClose();
    } catch (error: any) {
      setErrors({ submit: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div className="bg-white rounded-lg shadow-lg w-2/3 p-6 relative">
          <h2 className="text-2xl pb-2 font-bold mb-4 text-center">
            Update Student
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Student Name
                    </label>
                    <Field
                      type="text"
                      name="studentName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="studentName"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Father Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Father Name
                    </label>
                    <Field
                      type="text"
                      name="FatherName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="FatherName"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <Field
                      type="number"
                      name="age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Grade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Grade
                    </label>
                    <Field
                      type="text"
                      name="grade"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="grade"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* T-shirt size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      T-shirt Size
                    </label>
                    <Field
                      type="text"
                      name="TshirtSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="TshirtSize"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Activity Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Activity
                    </label>
                    <Field
                      as="select"
                      name="activity"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select an activity" />
                      {activities.map((activity, index) => (
                        <option key={activity + index} value={activity}>
                          {activity}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="activity"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select status" />
                      {statuses.map((status, index) => (
                        <option key={status + index} value={status}>
                          {status}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Group Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Group
                    </label>
                    <Field
                      as="select"
                      name="group"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select group" />
                      {groups.map((group, index) => (
                        <option key={group + index} value={group}>
                          {group}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="group"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>

                  {/* Camp Dropdown */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Camp
                    </label>
                    <Field
                      as="select"
                      name="camp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select camp" />
                      {camps.map((camp, index) => (
                        <option key={camp + index} value={camp}>
                          {camp}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="camp"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div> */}

                  {/* Sub Camp Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sub Camp
                    </label>
                    <Field
                      as="select"
                      name="subCamp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select sub camp" />
                      {subCamps.map((subCamp, index) => (
                        <option key={subCamp + index} value={subCamp}>
                          {subCamp}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="subCamp"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  {/* camp no Dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Camp Number
                    </label>
                    <Field
                      as="select"
                      name="camp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select Camp Number" />
                      {campNo.map((camp, index) => (
                        <option key={camp + index} value={camp}>
                          {camp}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="camp"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  {/* Student Report Text Area */}
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Student Report
                    </label>
                    <Field
                      as="textarea"
                      name="report"
                      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter student report here..."
                    />
                    <ErrorMessage
                      name="report"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 items-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${
                      isSubmitting
                        ? "bg-gray-400"
                        : "bg-blue-500 hover:bg-blue-600"
                    } text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                  >
                    {isSubmitting ? "Updating..." : "Update Student"}
                  </button>

                  {/* Close Modal Button */}
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>

                <ErrorMessage
                  name="submit"
                  component="div"
                  className="text-red-600 text-sm mt-2"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
