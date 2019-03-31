import {
  ADD_REMINDER,
  EDIT_REMINDER
} from './actions';
import uniqid from 'uniqid';

const createReminder = (reminder, date, color = 'black') => ({
  reminder,
  date,
  color,
  id: uniqid(),
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_REMINDER:
      return [...state, createReminder(action.reminder, action.date, action.color)];
    case EDIT_REMINDER:
      const filtered = state.filter(r => r.id !== action.id);
      const toEdit = state.find(r => r.id === action.id);
      const newReminder = {
        id: toEdit.id,
        date: action.date,
        color: action.color,
        reminder: action.reminder,
      };
      return [...filtered, newReminder];
    default:
      return state;
  }
};

export default reducer;
