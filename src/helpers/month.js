//converts firebase  timestamp to number from 0-11

export const firebaseTimestampToStringMonth = (fbTs) => {
  if (!fbTs) return null;

  const monthTs = new Date(fbTs.toMillis());
  const dataMonth = monthTs.getMonth();
  return dataMonth;
};
