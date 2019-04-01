import { utc as moment } from 'moment';

const getRange = cb => function* range(start, end) {
  const startClone = moment(start).startOf('day');
  const endClone = moment(end).startOf('day');
  while (startClone.isBefore(endClone) || startClone.isSame(endClone)) {
    yield cb(startClone);
    startClone.add(1, 'days');
  }
}

const ISOStringRange = getRange(m => m.toISOString());
const weekRange = getRange(m => m.week());

export const getDaysMonth = (date) => {
  const firstDay = moment(date).startOf('month');
  const endDay = moment(date).endOf('month');
  const weeks = [];
  for (const week of weekRange(firstDay, endDay)) {
    if (!weeks.some(w => w === week)) {
      weeks.push(week);
    }
  }
  const year = firstDay.get('years');
  return weeks.reduce((arr, w) => {
    const firstWeekDay = moment().year(year).week(w).day(0);
    const lastWeekDay = moment().year(year).week(w).day(6);
    const isoRange = [...ISOStringRange(firstWeekDay, lastWeekDay)];
    return arr.concat(isoRange);
  }, []);
};

export const getNextMonth = date => {
  const nextMonthDate = moment(date).add(1, 'months');
  return getDaysMonth(nextMonthDate);
};

export const getFirstDayNextMonth = date => {
  const nextMonthDate = moment(date).add(1, 'months').startOf('month');
  return nextMonthDate.toISOString();
}

export const getFirstDayPrevMonth = date => {
  const prevMonthDate = moment(date).subtract(1, 'months').startOf('month');
  return prevMonthDate.toISOString();
}


export const getPrevMonth = date => {
  const prevMonthDate = moment(date).subtract(1, 'months');
  return getDaysMonth(prevMonthDate);
}

const manipulateTimezone = method => values => {
  if (!values) {
    return values;
  }
  const { date } = values;
  const m = moment(date);
  const offset = (new Date()).getTimezoneOffset();
  m[method](offset, 'minutes');
  return {
    ...values,
    date: m.toISOString(),
  };
}

export const subtractTimezone = manipulateTimezone('subtract');

export const addTimezone = manipulateTimezone('add');
