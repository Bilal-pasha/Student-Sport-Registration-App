import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/Button/Button';
import { toast } from 'react-hot-toast';

const StudentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  fatherName: Yup.string().required('Father name is required'),
  rollNumber: Yup.number().required('Roll number is required'),
  fees: Yup.number().required('Fees is required').positive('Fees must be positive'),
  status: Yup.string().oneOf(['Paid', 'Unpaid'], 'Invalid status').required('Status is required'),
});

const StudentModal = ({ setIsModalOpen, students, setStudents ,create = false, update = false, id }: any) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      fatherName: '',
      rollNumber: '',
      fees: '',
      status: 'Unpaid',
    },
    validationSchema: StudentSchema,
    onSubmit: async (values, { resetForm }) => {
      create ? await CreateStudent(values, resetForm): await UpdateStudent(values, resetForm, id)
    },
  });

  const CreateStudent = async (formValues: any, resetForm: () => void) => {
    try {
      let response = await fetch("/api/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(formValues),
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
  const UpdateStudent = async (formValues: any, resetForm: () => void, StudentID: string) => {
    try {
      let response = await fetch(`/api/student/${StudentID}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(formValues),
      });
  
      const res = await response.json();
  
      // Update the student in the current list
      setStudents((prevStudents: any) =>
        prevStudents.map((student: any) =>
          student.id === StudentID ? res.result : student
        )
      );
  
      toast.success("Student Updated Successfully");
      setIsModalOpen(false);
      resetForm(); // Clear form after successful submission
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
          {formik.touched.name && formik.errors.name ? (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          ) : null}

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
          {formik.touched.fatherName && formik.errors.fatherName ? (
            <p className="text-red-500 text-sm">{formik.errors.fatherName}</p>
          ) : null}

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
          {formik.touched.rollNumber && formik.errors.rollNumber ? (
            <p className="text-red-500 text-sm">{formik.errors.rollNumber}</p>
          ) : null}

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
          {formik.touched.fees && formik.errors.fees ? (
            <p className="text-red-500 text-sm">{formik.errors.fees}</p>
          ) : null}

          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mb-4 w-full px-3 py-2 border rounded ${
              formik.touched.status && formik.errors.status ? 'border-red-500' : ''
            }`}
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {formik.touched.status && formik.errors.status ? (
            <p className="text-red-500 text-sm">{formik.errors.status}</p>
          ) : null}

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
