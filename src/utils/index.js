export const startDayEpoch = () => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startEpochInSeconds = Math.floor(startOfDay.getTime() / 1000);
  return startEpochInSeconds;
};

export const endDayEpoch = () => {
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const endEpochInSeconds = Math.floor(endOfDay.getTime() / 1000);
  return endEpochInSeconds;
};

export const generateTimeSlots = () => {
  const timeSlots = [];
  const hours = 12; // 12-hour format
  const minutes = [0, 30]; // 0 and 30 minutes

  for (let h = 0; h < 24; h++) {
    for (const m of minutes) {
      const hour = h === 0 ? 12 : h > 12 ? h - 12 : h; // Convert 0 to 12
      const amPm = h < 12 ? 'AM' : 'PM';
      const formattedTime = `${hour.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')} ${amPm}`;
      timeSlots.push(formattedTime);
    }
  }

  return timeSlots;
};

export function calculateTimeDifferenceInMinutes(epoch1, epoch2) {
  // Convert epoch values to Date objects
  const date1 = new Date(epoch1); // Multiply by 1000 to convert seconds to milliseconds
  const date2 = new Date(epoch2);

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = Math.abs(date2 - date1);

  // Convert milliseconds to minutes
  const totalMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

  return totalMinutes;
}
