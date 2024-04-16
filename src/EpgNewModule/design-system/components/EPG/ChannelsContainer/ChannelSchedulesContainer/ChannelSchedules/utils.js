export const sortScheduleAsc = (a, b) => {
  if (a.start < b.start) {
    return -1;
  }
  if (a.start > b.start) {
    return 1;
  }

  return 0;
};
