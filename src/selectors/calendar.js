import { createSelector } from 'reselect';
import { utc as moment } from 'moment';

const reminderSelector = state => state.reminders;

const daysSelector = state => state.calendar.days;

const calendarDateSelector = state => state.calendar.calendarDate;

export const currentMonthSelector = createSelector(
  calendarDateSelector,
  (date) => moment(date).format('MMMM YYYY')
);

const isWeekendFn = d => {
  const days = d.get('days');
  return days === 0 || days === 6;
}

const getProcessedReminders = (reminders, days, calendarDate) => {
  if (calendarDate === null) {
    return [];
  }
  const momentCalendarDate = moment(calendarDate);
  const calendarDateMonth = momentCalendarDate.get('months');
  const isCurrentMonthFn = d => d.get('months') === calendarDateMonth;
  const mappedDays = days.map(d => {
    const momentDay = moment(d);
    const formattedDate = momentDay.format('YYYY-MM-DD');
    const isCurrentMonth = isCurrentMonthFn(momentDay);
    const isWeekend = isWeekendFn(momentDay);
    const remindersForDay = isCurrentMonth ?
      reminders
        .filter(r => moment(r.date).format('YYYY-MM-DD') === formattedDate)
        .sort((r1, r2) => moment(r1.date) >= moment(r2.date) ? 1 : -1)
      : [];
    return {
      isCurrentMonth,
      isWeekend,
      date: d,
      week: momentDay.get('weeks'),
      reminders: remindersForDay,
      formattedDay: momentDay.format('D'),
    };
  });
  const retVal = [];
  const weekCount = [];
  let index = -1;
  mappedDays.forEach(d => {
    if (!weekCount.some(w => w === d.week)) {
      index++;
      weekCount.push(d.week);
      retVal.push({
        week: d.week,
        days: []
      });
    }
    retVal[index].days.push(d);
  });
  return retVal;
};

export const processedRemindersSelector = createSelector(
  reminderSelector,
  daysSelector,
  calendarDateSelector,
  getProcessedReminders,
);
