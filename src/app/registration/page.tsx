"use client"
import React from 'react';
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
}

const RegistrationForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const initialValues: RegistrationData = {
    madrasaName: '',
    madrasaAddress: '',
    totalStudents: 0,
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
    <div className="flex justify-center items-center h-[78vh] ">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register your madrasa now</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="madrasaName" className="block font-semibold">
                Madrasa Name
              </label>
              <Field
                type="text"
                id="madrasaName"
                name="madrasaName"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="madrasaName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="madrasaAddress" className="block font-semibold">
                Madrasa Address
              </label>
              <Field
                type="text"
                id="madrasaAddress"
                name="madrasaAddress"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="madrasaAddress"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="totalStudents" className="block font-semibold">
                Total Students
              </label>
              <Field
                type="number"
                id="totalStudents"
                name="totalStudents"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="totalStudents"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

// export default RegistrationForm;

export default CheckAuthentication(RegistrationForm)

