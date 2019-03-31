export const ADD_REMINDER = 'ADD_REMINDER';
export const EDIT_REMINDER = 'EDIT_REMINDER';
export const NEXT_MONTH = 'NEXT_MONTH';
export const PREV_MONTH = 'PREV_MONTH';

export const addReminder = ({ color, reminder, date }) => ({
  date,
  reminder,
  color,
  type: ADD_REMINDER,
});

export const editReminder = (id, { color, reminder, date }) => ({
  id,
  color,
  reminder,
  date,
  type: EDIT_REMINDER,
});

export const nextMonth = () => ({
  type: NEXT_MONTH,
});

export const prevMonth = () => ({
  type: PREV_MONTH,
});
