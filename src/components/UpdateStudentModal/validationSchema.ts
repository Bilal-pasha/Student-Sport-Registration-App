import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    studentName: Yup.string().required("Student name is required"),
    FatherName: Yup.string().required("Father Name is required"),
    age: Yup.number().required("Age is required").positive().integer(),
    grade: Yup.string().required("Grade is required"),
    TshirtSize: Yup.string().required("T-shirt Size is required"),
    activity: Yup.string().required("Activity is required"),
    status: Yup.string().required("Status is required"),
    group: Yup.string().required("Group is required"),
    camp: Yup.string().required("Camp is required"),
    subCamp: Yup.string().required("Sub Camp is required"),
    report: Yup.string(), // Validation for report
});