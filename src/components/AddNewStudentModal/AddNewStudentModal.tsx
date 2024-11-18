"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup"; // Ensure you have Yup for validation

interface AddNewStudentModalProps {
  setModalOpen: (open: boolean) => void;
  madrasaId: string;
}

export const AddNewStudentModal: React.FC<AddNewStudentModalProps> = ({
  setModalOpen,
  madrasaId,
}) => {
  // Initial form values
  const initialValues = {
    studentName: "",
    FatherName: "",
    age: "",
    grade: "",
    TshirtSize: "",
    activity: "",
    // image: null as File | null, // New field for image upload
  };
  const TshirtSizes = ["Medium", "large", "Xl"];
  // List of activities
  const activities = [
    "First Aid",
    "Traffic Police",
    "Highway Police",
    "Civil Defence",
    "Football",
    "Volleyball",
    "Spoon Race",
    "100 Meter Race",
    "Tug of War",
  ];

  // Form validation schema
  const validationSchema = Yup.object({
    studentName: Yup.string().required("Required"),
    FatherName: Yup.string().required("Required"),
    age: Yup.number().required("Required").positive().integer(),
    grade: Yup.string().required("Required"),
    TshirtSize: Yup.string().required("Required"),
    activity: Yup.string().required("Required"),
    image: Yup.mixed()
      .notRequired()
      .test("fileSize", "File size must be less than 1 Mb", (value) => {
        return !value || (value as File).size <= 1024 * 1024; // Apply only if value exists
      })
      .test("fileType", "Unsupported file format", (value) => {
        return (
          !value ||
          ["image/jpeg", "image/png", "image/gif"].includes(
            (value as File).type
          )
        ); // Apply only if value exists
      }),
  });
  

  // Handle form submission
  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    const formData = new FormData();

    // Append all fields to the FormData object
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Append madrasaId as well
    formData.append("madrasaId", madrasaId);

    try {
      const response = await fetch("/api/register-student", {
        method: "POST",
        body: formData, // Use FormData directly
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(data.message);
      setModalOpen(false); // Close the modal after successful submission
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
            Add New Student
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="space-y-4" encType="multipart/form-data">
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
                      as="select"
                      name="TshirtSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" label="Select T-shirt Size" />
                      {TshirtSizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </Field>
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
                      {activities.map((activity) => (
                        <option key={activity} value={activity}>
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

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Image (max 1 MB)
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/jpeg, image/png, image/gif"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          setFieldValue("image", file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ErrorMessage
                      name="image"
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
                    {isSubmitting ? "Adding..." : "Add Student"}
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
