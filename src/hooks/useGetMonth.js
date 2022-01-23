const useGetMonth = () => {
  let date = new Date();
  let currentMonthDigit = date.getMonth();

  return { currentMonthDigit };
};

export default useGetMonth;
