export const formatDate = (d = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day}.${month}.${year}`;
};
