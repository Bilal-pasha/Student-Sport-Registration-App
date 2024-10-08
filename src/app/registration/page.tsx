"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CheckAuthentication from '@/components/CheckAuth/CheckAuth';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface RegistrationData {
  madrasaName: string;
  madrasaAddress: string;
  totalStudents: number;
  ContactPersonName: string;
  CellNumber: number;
}

const RegistrationForm: React.FC = () => {
  const { data: session } = useSession();
  const [res, setRes] = useState();
  const router = useRouter()
  const initialValues: RegistrationData = {
    madrasaName: '',
    madrasaAddress: '',
    totalStudents:  0,
    ContactPersonName: '',
    CellNumber: 0,
  };

  const validationSchema = Yup.object({
    madrasaName: Yup.string().required('Madrasa name is required'),
    madrasaAddress: Yup.string().required('Madrasa address is required'),
    totalStudents: Yup.number()
      .required('Total students is required')
      .min(1, 'There must be at least 1 student'),
  });

  const onSubmit = async (values: RegistrationData) => {
    const payload = {
      ...values, userId: session?.user?.email,
    }
    try {
      const response = await fetch('/api/register-madrasa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setRes(data)
        toast.success(data.message)
        router.push('/Home')
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
    return (
      <>
      {!res && (
      <div className="flex justify-center items-center h-[78vh]">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg transform transition hover:scale-105 duration-300 ease-in-out">
          <h1 className="text-3xl font-extrabold text-indigo-600 mb-6 text-center">
            Register Your School
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-6">
                <label htmlFor="madrasaName" className="block text-lg font-medium text-gray-700">
                  School Name
                </label>
                <Field
                  type="text"
                  id="madrasaName"
                  name="madrasaName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  placeholder="Enter school name"
                />
                <ErrorMessage
                  name="madrasaName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="madrasaAddress" className="block text-lg font-medium text-gray-700">
                  Address
                </label>
                <Field
                  type="text"
                  id="madrasaAddress"
                  name="madrasaAddress"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  placeholder="Enter address"
                />
                <ErrorMessage
                  name="madrasaAddress"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="totalStudents" className="block text-lg font-medium text-gray-700">
                  Total Students
                </label>
                <Field
                  type="number"
                  id="totalStudents"
                  name="totalStudents"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  placeholder="Enter total students"
                />
                <ErrorMessage
                  name="totalStudents"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="ContactPersonName" className="block text-lg font-medium text-gray-700">
                  Contact Person Name
                </label>
                <Field
                  type="text"
                  id="ContactPersonName"
                  name="ContactPersonName"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  placeholder="Enter contact person name"
                />
                <ErrorMessage
                  name="ContactPersonName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="CellNumber" className="block text-lg font-medium text-gray-700">
                  Cell Number
                </label>
                <Field
                  type="tel"
                  id="CellNumber"
                  name="CellNumber"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                  placeholder="Enter cell number"
                />
                <ErrorMessage
                  name="CellNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
  </div>
      )}
  </>
  );
};

// export default RegistrationForm;

export default CheckAuthentication(RegistrationForm)

