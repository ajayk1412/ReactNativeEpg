/**
 *
 * @returns array contains time slots from 12AM to 12AM
 */
export const generateTimeSlots = () => {
  const timeSlots = [];
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

/**
 *
 * @param {*} epoch1 start epoch time of the program
 * @param {*} epoch2 end epoch time of the program
 * @returns  number which is duration of program in minutes
 */
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

/**
 *
 * @returns width for autoscroll feature for scrollview when user lands my box page
 */
export function calculateAutoScrollLength() {
  // Calculate the total minutes
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2-digit format
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2-digit format
  const time = `${hours}:${minutes}`;
  const [hrs, mins] = time.split(':').map(Number);
  const totalMinutes = hrs * 60 + 30 * Math.floor(mins / 30);
  return totalMinutes * 3;
}
export function isActiveCell(item) {
  const currentEpoch = new Date().getTime();
  if (currentEpoch >= item?.startTime && currentEpoch < item?.endTime) {
    return true;
  }
  return false;
}

/**
 * addingMissingEPG functions fills the missing EPG program as empty
 * @param {*} epg
 * @returns parse epg array
 */
export function addingMissingEPG(epg) {
  const arr1 = epg;
  const arr2 = [];
  for (let i = 0; i < arr1.length; i++) {
    if (i >= 0 && i < arr1.length - 1) {
      if (i === 0) {
        /** added the overlap EPG in start of EPG */
        const {startTime} = arr1[i];
        let date = new Date(startTime);
        date.setHours(0, 0, 0, 0);
        const updateEpochValue = date.getTime();
        if (updateEpochValue !== startTime) {
          arr2.push({
            id: updateEpochValue,
            startTime: updateEpochValue,
            endTime: startTime,
          });
        }
      }
      /** in between missing epg */
      const {endTime} = arr1[i];
      const startTime1 = arr1[i + 1]?.startTime;
      if (endTime === startTime1) {
        arr2.push(arr1[i]);
      } else {
        arr2.push(arr1[i]);
        arr2.push({id: endTime, startTime: endTime, endTime: startTime1});
      }
    } else {
      /** truncate the overlap EPG in last program of EPG */
      let date = new Date(arr1[i]?.endTime);
      date.setHours(0, 0, 0, 0);
      const updateEpochValue = date.getTime();
      arr2.push({...arr1[i], endTime: updateEpochValue});
    }
  }
  return arr2;
}
