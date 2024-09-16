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