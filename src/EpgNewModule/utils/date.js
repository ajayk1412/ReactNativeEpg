import {
  format,
  parseISO,
  addDays,
  subDays,
  addHours,
  subHours,
  eachDayOfInterval,
  eachHourOfInterval,
  differenceInMinutes,
  differenceInSeconds,
  addMinutes,
  subMinutes,
  isEqual,
  intervalToDuration,
  isAfter,
  isBefore,
} from 'date-fns';

export const formatDate = (date, desiredFormat, locale) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;

  if (locale) {
    return format(parsedDate, desiredFormat, { locale });
  }

  return format(parsedDate, desiredFormat);
};

export const getEachDayOfInterval = (startDate, endDate) => {
  return eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
};

export const getEachHourOfInterval = (startDate, endDate) => {
  return eachHourOfInterval({
    start: startDate,
    end: endDate,
  });
};

export const subDateDays = (date, daysToSub) => {
  return subDays(date, daysToSub);
};

export const addDateDays = (date, daysToAdd) => {
  return addDays(date, daysToAdd);
};

export const subDateHours = (date, hoursToSub) => {
  return subHours(date, hoursToSub);
};

export const addDateHours = (date, hoursToAdd) => {
  return addHours(date, hoursToAdd);
};

export const addDateMinutes = (date, minutesToAdd) => {
  return addMinutes(date, minutesToAdd);
};

export const subDateMinutes = (date, minutesToSub) => {
  return subMinutes(date, minutesToSub);
};

export const getMinutesDifferenceBetweenDates = (startDate, endDate) => {
  return differenceInMinutes(startDate, endDate);
};

export const getSecondsDifferenceBetweenDates = (startDate, endDate) => {
  return differenceInSeconds(startDate, endDate);
};

export const getCleanHour = (date, hour) => {
  const dateHour = new Date(date);

  if (hour !== undefined) {
    dateHour.setHours(hour);
  }

  dateHour.setMinutes(0);
  dateHour.setSeconds(0);
  dateHour.setMilliseconds(0);

  return dateHour;
};

export const getDayHoursIntervals = (date, interval) => {
  let hours = [];
  const dateStart = getCleanHour(date, 0);
  const dateEnd = addDateHours(dateStart, 23);

  const eachHourInterval = getEachHourOfInterval(dateStart, dateEnd);

  let lastEndHour;

  eachHourInterval.forEach((dateHour, index) => {
    if (lastEndHour && index % interval !== 0) {
      return;
    }

    const startHour = dateHour;
    const endHour = addDateHours(dateHour, interval);

    hours.push({
      startTime: {
        date: startHour,
        formatted: formatDate(startHour, 'HH:mm'),
      },
      endTime: {
        date: endHour,
        formatted: formatDate(endHour, 'HH:mm'),
      },
    });

    lastEndHour = endHour;
  });

  return hours;
};

export const getDateIndexFromInterval = (date, eachInterval) => {
  const currentDateHour = getCleanHour(date);

  const index = eachInterval.findIndex((interval) =>
    isEqual(currentDateHour, getCleanHour(interval.startTime.date))
  );

  return index;
};

export const duration = (start, end) => {
  return intervalToDuration({ start, end });
};

export const dateIsEqual = (date1, date2) => {
  return isEqual(date1, date2);
};

export const isDateAfter = (date1, date2) => {
  return isAfter(date1, date2);
};

export const isDateBefore = (date1, date2) => {
  return isBefore(date1, date2);
};
