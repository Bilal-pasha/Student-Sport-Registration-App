"use client"
import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const AddNewStudentModal = ({setModalOpen, madrasaId}: any) => {
     // Initial form values
  const initialValues = {
    studentName: '',
    age: '',
    grade: '',
  };

  // Form validation schema
  const validationSchema = Yup.object().shape({
    studentName: Yup.string().required('Student name is required'),
    age: Yup.number().required('Age is required').positive().integer(),
    grade: Yup.string().required('Grade is required'),
  });

  // Handle form submission
  const handleSubmit = async (values: any, { setSubmitting, setErrors }: any) => {
    const payload = {
      ...values,
      madrasaId: madrasaId,
    };

    try {
      const response = await fetch('/api/register-student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      alert(data.message);
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
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4 text-center">Add a Student</h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* Student Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Student Name</label>
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

                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
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
                    <label className="block text-sm font-medium text-gray-700">Grade</label>
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

                  {/* Submit Button */}
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${
                        isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                      } text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200`}
                    >
                      {isSubmitting ? 'Adding...' : 'Add Student'}
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
    </div>  )
}
