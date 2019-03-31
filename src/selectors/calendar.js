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
  const days = moment(d).get('days');
  return days === 0 || days === 6;
}

const getProcessedReminders = (reminders, days, calendarDate) => {
  const momentCalendarDate = moment(calendarDate);
  const calendarDateMonth = momentCalendarDate.get('months');
  const formattedDate = momentCalendarDate.format('YYYY-MM-DD');
  const isCurrentMonthFn = d => moment(d).get('months') === calendarDateMonth;
  return days.map(d => {
    const isCurrentMonth = isCurrentMonthFn(d);
    const isWeekend = isWeekendFn(d);
    const remindersForDay = isCurrentMonth ?
      reminders.filter(r => moment(r.date).format('YYYY-MM-DD') === formattedDate)
      : [];
    return {
      isCurrentMonth,
      isWeekend,
      date: d,
      reminders: remindersForDay,
    };
  });
};

export const processedRemindersSelector = createSelector(
  reminderSelector,
  daysSelector,
  calendarDateSelector,
  getProcessedReminders,
);
