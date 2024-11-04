export const getCurrentMonthYear = () => {
  const today = new Date();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[today.getMonth()];
  const year = today.getFullYear();
  return `${month} ${year}`;
};

export const feesStatus = [
  { month: 'January', status: 'Not Paid' },
  { month: 'February', status: 'Not Paid' },
  { month: 'March', status: 'Not Paid' },
  { month: 'April', status: 'Not Paid' },
  { month: 'May', status: 'Not Paid' },
  { month: 'June', status: 'Not Paid' },
  { month: 'July', status: 'Not Paid' },
  { month: 'August', status: 'Not Paid' },
  { month: 'September', status: 'Not Paid' },
  { month: 'October', status: 'Not Paid' },
  { month: 'November', status: 'Not Paid' },
  { month: 'December', status: 'Not Paid' },
];

export const tableHead = ['Name', "Father Name", "ID Number", "Fees", "Status"]

export enum ROLE {
  ADMIN = "admin"
}
export enum STATUS {
  APPROVED = "Approved",
  PENDING = 'Pending',
  DECLINE = 'Decline'
}
export const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
