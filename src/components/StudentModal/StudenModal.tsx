import React from 'react';
import { useFormik } from 'formik';
import { Button } from '@/components/Button/Button';
import { toast } from 'react-hot-toast';
import { feesStatus } from '@/constant/constant';
import { StudentSchema } from './StudentModel.Schema';

const StudentModal = ({ setIsModalOpen, students, setStudents ,create = false, update = false, id, classSlug, studentData, setStudent }: any) => {
  const formik = useFormik({
    initialValues: {
      name: !create ? studentData?.name : "",
      fatherName: !create ? studentData?.fatherName: "",
      rollNumber: !create ? studentData?.rollNumber: "",
      fees: !create ? studentData?.fees: "",
      feesStatus: !create ? studentData?.feesStatus: feesStatus , 
      status: 'Unpaid',
    },
    validationSchema: StudentSchema,
    onSubmit: async (values, { resetForm }) => {
      create ? await CreateStudent(values, resetForm): await UpdateStudent(values, resetForm, id)
    },
  });
  const CreateStudent = async (formValues: any, resetForm: () => void) => {
    const payload = {
      ...formValues, // This includes other form fields like name, fatherName, rollNumber, etc.
      feesStatus: formValues.feesStatus, // Passing the updated feesStatus array from form values
    };

    try {
      let response = await fetch(`/api/class/${classSlug}/student`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(payload),
      });

      const res = await response.json();
      setStudents([...students, res.result]);
      toast.success("Student Added Successfully");
      setIsModalOpen(false);
      resetForm(); // Clear form after successful submission
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Failed to add student");
    }
  };

  const UpdateStudent = async (
    formValues: any, 
    resetForm: () => void, 
    StudentID: string
  ) => {
    try {
      // Add the StudentID to formValues
      const updatedFormValues = { ...formValues, studentId: StudentID };
  
      let response = await fetch(`/api/student/${StudentID}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(updatedFormValues),
      });
  
      const res = await response.json();
  
      if (response.ok) {
        // Update the student in the current list with the updated data from backend
        setStudent(res.body)
        // Show success message with the backend response message
        toast.success(res?.message);
        setIsModalOpen(false);
        resetForm(); // Clear the form after successful submission
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      toast.error("Failed to update student");
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 className="text-xl font-bold mb-4">{create ? "Add New" : "Update"} Student</h2>
    <form onSubmit={formik.handleSubmit}>
      {/* Name Input */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`mb-2 w-full px-3 py-2 border rounded ${
          formik.touched.name && formik.errors.name ? 'border-red-500' : ''
        }`}
      />
              {typeof formik.errors.name === 'string' && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}


      {/* Father Name Input */}
      <input
        type="text"
        name="fatherName"
        placeholder="Father Name"
        value={formik.values.fatherName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`mb-2 w-full px-3 py-2 border rounded ${
          formik.touched.fatherName && formik.errors.fatherName ? 'border-red-500' : ''
        }`}
      />
            {formik.touched.fatherName && typeof formik.errors.fatherName === 'string' ? (
        <p className="text-red-500 text-sm">{formik.errors.fatherName}</p>
      ) : null}


      {/* Roll Number Input */}
      <input
        type="text"
        name="rollNumber"
        placeholder="Roll Number"
        value={formik.values.rollNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`mb-2 w-full px-3 py-2 border rounded ${
          formik.touched.rollNumber && formik.errors.rollNumber ? 'border-red-500' : ''
        }`}
      />
          {formik.touched.rollNumber && typeof formik.errors.rollNumber === 'string' ? (
          <p className="text-red-500 text-sm">{formik.errors.rollNumber}</p>
        ) : null}

      {/* Fees Input */}
      <input
        type="text"
        name="fees"
        placeholder="Fees"
        value={formik.values.fees}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className={`mb-2 w-full px-3 py-2 border rounded ${
          formik.touched.fees && formik.errors.fees ? 'border-red-500' : ''
        }`}
      />
          {formik.touched.fees && typeof formik.errors.fees === 'string' ? (
        <p className="text-red-500 text-sm">{formik.errors.fees}</p>
      ) : null}


      {/* Monthly Fees Status Checkboxes */}
      <div className="mt-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">Monthly Fees Status</h3>
          <div className="flex flex-wrap gap-3">
            {feesStatus?.map(({ month, status }, index) => (
              <div key={month} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name={`feesStatus.${month}`}
                  checked={formik?.values?.feesStatus[index]?.status === 'Paid'}
                  onChange={(e) =>
                    formik.setFieldValue(`feesStatus`, formik.values.feesStatus.map((fee: any, i: number) =>
                      i === index ? { ...fee, status: e.target.checked ? 'Paid' : 'Not Paid' } : fee
                    ))
                  }
                  className="mr-2"
                />
                <label htmlFor={`feesStatus.${month}`} className="text-gray-700">{month}</label>
              </div>
            ))}
          </div>
        </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end space-x-6">
        <Button
          onClick={() => setIsModalOpen(false)}
          variant="secondary"
          size="md"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
        >
          {create ? "Add Student" : "Update Student"}
        </Button>
      </div>
    </form>
  </div>
</div>

  );
};

export default StudentModal;
