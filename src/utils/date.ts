export const utcDateTime = (date?: string) => {
  const dateTime = date ? new Date(date) : new Date(); // your local datetime
  const utcDate = new Date(dateTime.toUTCString().slice(0, -4));
  return utcDate;
};
